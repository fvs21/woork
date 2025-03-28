package org.woork.backend.authentication;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.woork.backend.authentication.requests.AuthenticatedUpdatePasswordRequest;
import org.woork.backend.authentication.requests.RegistrationRequest;
import org.woork.backend.exceptions.exceptions.*;
import org.woork.backend.exceptions.exceptions.CannotRequestResetPasswordException;
import org.woork.backend.exceptions.exceptions.EmailAlreadyTakenException;
import org.woork.backend.exceptions.exceptions.EmailNotAddedException;
import org.woork.backend.passwordreset.PasswordResetService;
import org.woork.backend.sms.SMSService;
import org.woork.backend.token.TokenService;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;
import org.woork.backend.utils.AuthenticationUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Stream;

@Service
public class AuthenticationService {
    private static final Log log = LogFactory.getLog(AuthenticationService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SMSService smsService;
    private final PasswordResetService passwordResetService;

    private final Logger logger = Logger.getLogger(AuthenticationService.class.getName());
    private final TokenService tokenService;

    @Autowired
    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            TokenService tokenService,
            SMSService smsService,
            PasswordResetService passwordResetService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.smsService = smsService;
        this.passwordResetService = passwordResetService;
    }

    private String capitalizeName(String name) {
        return StringUtils.capitalize(name);
    }

    private ArrayList<String> normalizeName(String name) {
        ArrayList<String> result = new ArrayList<>();
        String[] splittedName = name.split(" ");
        result.add(capitalizeName(splittedName[0]));

        if (splittedName.length > 1) {
            result.add(splittedName[1]);
        }

        return result;
    }

    private String arrayToName(ArrayList<String> names) {
        if(names.size() > 1) {
            return String.join(" ", names);
        } else {
            return names.get(0);
        }
    }

    private String createUsername(ArrayList<String> firstnames, ArrayList<String> lastnames) {
        List<String> merged = Stream.of(firstnames, lastnames)
                .flatMap(Collection::stream)
                .distinct()
                .toList();

        StringBuilder username = new StringBuilder();

        for(String name : merged) {
            username.append(StringUtils.lowerCase(name)).append("-");
        }

        long count = userRepository.countByFirstNameAndLastName(arrayToName(firstnames), arrayToName(lastnames));
        if(count == 0) {
            return username.substring(0, username.length() - 1);
        } else {
            return username.toString() + count;
        }
    }

    public User register(RegistrationRequest request) {
        ArrayList<String> firstname = normalizeName(request.getFirstName());
        ArrayList<String> lastname = normalizeName(request.getLastName());

        try {
            User user = new User();
            user.setFirstName(arrayToName(firstname));
            user.setLastName(arrayToName(lastname));
            user.setPhone(request.getCountryCode() + request.getPhone());
            user.setCountryCode(request.getCountryCode());
            user.setUsername(createUsername(firstname, lastname));
            user.setDateOfBirth(LocalDate.parse(request.getDateOfBirth(), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            String verificationCode = AuthenticationUtils.generateVerificationCode();
            user.setPhoneVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            logger.info("Verification code generated: " + verificationCode);
            //sendPhoneVerificationCode("+" + user.getPhone(), verificationCode);
            return userRepository.save(user);
        } catch(DataIntegrityViolationException e) {
            throw new PhoneNumberAlreadyTakenException();
        }
    }

    public HashMap<String, String> authenticate(String credential, String password) {
        if(AuthenticationUtils.isEmail(credential)) {
            User check = userRepository.findByEmail(credential).orElse(null);
            if(check != null && !check.hasEmailVerified()) {
                throw new IncorrectCredentialsException();
            }
        }

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credential,
                            password
                    )
            );
            User user = (User) auth.getPrincipal();
            String refreshToken = tokenService.generateRefreshToken(user);
            String accessToken = tokenService.generateAccessToken(user);

            HashMap<String, String> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);

            return response;
        } catch(AuthenticationException | UserDoesNotExistException e) {
            throw new IncorrectCredentialsException();
        }
    }

    public boolean isUserAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !authentication.getName().equals("anonymousUser");
    }

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private String createPasswordResetLink(String credential, String credentialType, String token) {
        StringBuilder link = new StringBuilder("http://localhost:3000/reset-password/" + token);

        if(credentialType.equals("phone"))
            link.append("?phone=").append(credential);
        else
            link.append("?email=").append(credential);

        return link.toString();
    }

    public String sendPasswordResetLink(String phoneOrEmail) {
        String credential = AuthenticationUtils.isEmail(phoneOrEmail) ? "email" : "phone";
        User user = userRepository.findByEmailOrPhone(phoneOrEmail, phoneOrEmail).orElseThrow(UserDoesNotExistException::new);

        if(credential.equals("email") && !user.hasEmailVerified()) {
            throw new UserDoesNotExistException();
        }

        if(!user.canUpdatePassword()) {
            throw new CannotRequestResetPasswordException(PasswordResetService.RECENTLY_UPDATED_PASSWORD);
        }

        String generatedToken = passwordResetService.createPasswordResetToken(user);

        //emailService.sendPasswordResetLink(...args);
        logger.info("Link for " + phoneOrEmail + ": " + createPasswordResetLink(phoneOrEmail, credential, generatedToken));
        return PasswordResetService.RESET_LINK_SENT;
    }

    public boolean resetTokenExists(String token) {
        return passwordResetService.resetTokenExists(token);
    }

    public String resetPassword(String token, String credential, String newPassword, String confirmPassword) {
        if(!newPassword.equals(confirmPassword)) {
            throw new PasswordsDontMatchException();
        }
        passwordResetService.resetPassword(token, credential, newPassword);
        return PasswordResetService.PASSWORD_RESET;
    }

    public void updatePhoneNumber(User user, String countryCode, String phoneNumber) {
        try {
            user.setPhone(countryCode + phoneNumber);
            user.setCountryCode(Integer.parseInt(countryCode));

            String verificationCode = AuthenticationUtils.generateVerificationCode();
            //sendPhoneVerificationCode("+" + user.getPhone(), verificationCode);
            user.setPhoneVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            userRepository.save(user);
            logger.info(verificationCode);
        } catch (Exception e) {
            throw new PhoneNumberAlreadyTakenException();
        }
    }

    public void sendPhoneVerificationCode(String phoneNumber, String verificationCode) {
        if(!smsService.checkPhoneValidity(phoneNumber)) {
            throw new InvalidPhoneNumberException();
        }
        String message = "Your verification code is " + verificationCode;
        smsService.sendSMS(
                phoneNumber,
                message
        );
    }

    public void checkPhoneVerificationCode(User user, String verificationCode) {
        String storedVerificationCode = user.getPhoneVerificationCode();
        if(!passwordEncoder.matches(verificationCode, storedVerificationCode)) {
            throw new IncorrectVerificationCodeException();
        }
        if(!user.isPhoneVerificationCodeValid()) {
            throw new VerificationCodeExpiredException();
        }
        user.markPhoneAsVerified();
        userRepository.save(user);
    }

    public String generateNewPhoneVerificationCode(User user) {
        log.info(user.getPhoneVerifiedAt());

        if(!user.canRequestPhoneVerificationCode()) {
            throw new UnableToGenerateVerificationCodeException("There is a refresh time between code generation");
        }
        if(user.hasPhoneVerified()) {
            throw new UnableToGenerateVerificationCodeException("User is verified");
        }
        try {
            String verificationCode = AuthenticationUtils.generateVerificationCode();
            System.out.println(verificationCode);

            user.setPhoneVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            //sendPhoneVerificationCode("+" + user.getPhone(), verificationCode);
            userRepository.save(user);
            return "Código de verificación enviado.";
        } catch (Exception e) {
            throw new UnableToGenerateVerificationCodeException();
        }
    }

    public void updateEmail(User user, String email) {
        try {
            user.setEmail(email);
            String verificationCode = AuthenticationUtils.generateVerificationCode();
            //sendEmailVerificationCode(email, verificationCode);
            user.setEmailVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            userRepository.save(user);
            logger.info("Email code: " + verificationCode);

        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public void sendEmailVerificationCode(String email, String verificationCode) {
        //TODO: Add verification code generation date and datetime to check expiration
        System.out.println("Your one time generated password: " + verificationCode);
    }

    public void checkEmailVerificationCode(User user, String verificationCode) {
        if(user.getEmail() == null) {
            throw new EmailNotAddedException();
        }
        if(!user.isEmailVerificationCodeValid()) {
            throw new VerificationCodeExpiredException();
        }
        if(passwordEncoder.matches(verificationCode, user.getEmailVerificationCode())) {
            user.markEmailAsVerified();
            userRepository.save(user);
        } else {
            throw new IncorrectVerificationCodeException();
        }
    }

    public String generateNewEmailVerificationCode(User user) {
        if(!user.canRequestEmailVerificationCode()) {
            throw new UnableToGenerateVerificationCodeException("There is a refresh time between code generation");
        }
        if(user.hasEmailVerified()) {
            throw new UnableToGenerateVerificationCodeException("User has a verified email");
        }
        try {
            String verificationCode = AuthenticationUtils.generateVerificationCode();
            System.out.println("Email code: " + verificationCode);
            user.setEmailVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            userRepository.save(user);
            return "Email verification code successfully sent";
        } catch (Exception e) {
            throw new UnableToGenerateVerificationCodeException();
        }
    }

    public void updatePassword(User user, String currentPassword, String newPassword) {
        if(!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new UnableToUpdateUserException("Las contraseñas no coinciden");
        }
        if(!AuthenticationUtils.validatePassword(newPassword)) {
            throw new UnableToUpdateUserException("Debes elegir una contraseña más segura.");
        }
        if(!user.canUpdatePassword()) {
            throw new UnableToUpdateUserException("Cambiaste tu contraseña recientemente. Vuelvelo a intentar en un rato.");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
    }

    public String changePassword(User user, AuthenticatedUpdatePasswordRequest request) {
        String currentPassword = request.getCurrentPassword();
        String newPassword = request.getNewPassword();
        String confirmPassword = request.getConfirmPassword();

        if(!newPassword.equals(confirmPassword)) {
            throw new PasswordsDontMatchException();
        }

        if(!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IncorrectCredentialsException();
        }

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);
        return "Contraseña actualizada";
    }
}