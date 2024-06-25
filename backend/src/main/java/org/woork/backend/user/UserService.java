package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.authentication.RegistrationObject;
import org.woork.backend.exceptions.*;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.location.Location;
import org.woork.backend.location.LocationObject;
import org.woork.backend.location.LocationRepository;
import org.woork.backend.role.Role;
import org.woork.backend.role.RoleRepository;
import org.woork.backend.sms.SMSService;
import org.woork.backend.token.TokenService;
import org.woork.backend.utils.RegistrationUtils;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final TokenService tokenService;
    private final LocationRepository locationRepository;
    private final ImageService imageService;
    private final SMSService smsService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository, TokenService tokenService,
                       LocationRepository locationRepository, ImageService imageService, SMSService smsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.tokenService = tokenService;
        this.locationRepository = locationRepository;
        this.imageService = imageService;
        this.smsService = smsService;
    }

    public User registerUser(RegistrationObject registration) {
        User user = new User();
        user.setFirst_name(registration.getFirstName());
        user.setLast_name(registration.getLastName());
        user.setCountryCode(registration.getCountryCode());
        user.setPhone(registration.getCountryCode() + registration.getPhone());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setDateOfBirth(registration.getDateOfBirth());

        Set<Role> roles = user.getAuthorities();
        roles.add(roleRepository.findByAuthority("USER").get());
        user.setAuthorities(roles);

        try {
            userRepository.save(user);
            String verificationCode = RegistrationUtils.generateVerificationCode();
            user.setPhoneVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            System.out.println(verificationCode);
            //sendPhoneVerificationCode("+" + user.getPhone(), verificationCode);
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new PhoneNumberAlreadyTakenException();
        }
    }


    public String updatePhoneNumber(User user, String countryCode, String phoneNumber) {
        if(user.isPhoneVerificationCodeValid()) {
            throw new UnableToGenerateVerificationCodeException("Code hasn't expired");
        }
        try {
            user.setPhone(countryCode + phoneNumber);
            user.setCountryCode(Integer.parseInt(countryCode));

            String verificationCode = RegistrationUtils.generateVerificationCode();
            System.out.println(verificationCode);
            //sendPhoneVerificationCode("+" + user.getPhone(), verificationCode);
            user.setPhoneVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            user.setVerified(false);
            userRepository.save(user);
            return "Phone number successfully updated. Verification code sent";
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

    public User checkPhoneVerificationCode(User user, String verificationCode) {
        if(!user.isPhoneVerificationCodeValid()) {
            throw new VerificationCodeExpiredException();
        }
        String storedVerificationCode = user.getPhoneVerificationCode();
        if(!passwordEncoder.matches(verificationCode, storedVerificationCode)) {
            throw new IncorrectVerificationCodeException();
        }
        user.setPhoneVerificationCode(null);
        user.setVerified(true);
        return userRepository.save(user);
    }

    public String generatePhoneVerificationCode(User user) {
        if(user.isPhoneVerificationCodeValid()) {
            throw new UnableToGenerateVerificationCodeException("Previous phone verification code is still valid");
        }
        if(user.isVerified()) {
            throw new UnableToGenerateVerificationCodeException("User is verified");
        }
        try {
            String verificationCode = RegistrationUtils.generateVerificationCode();
            System.out.println(verificationCode);

            user.setPhoneVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            //sendPhoneVerificationCode("+" + user.getPhone(), verificationCode);
            userRepository.save(user);
            return "Verification code successfully sent";
        } catch (Exception e) {
            throw new UnableToGenerateVerificationCodeException();
        }
    }

    public String updateEmail(User user, String email) {
        if(user.isEmailVerificationCodeValid()) {
            throw new UnableToGenerateVerificationCodeException("Code hasn't expired");
        }
        try {
            user.setEmail(email);
            String verificationCode = RegistrationUtils.generateVerificationCode();
            System.out.println("Email code: " + verificationCode);
            sendEmailVerificationCode(email, verificationCode);
            user.setEmailVerificationCode(
                    passwordEncoder.encode(verificationCode)
            );
            userRepository.save(user);
            return "Email successfully updated. Verification code sent";
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public void sendEmailVerificationCode(String email, String verificationCode) {
        User user = userRepository.findByEmail(email).orElseThrow(UserDoesNotExistException::new);
        user.setEmailVerificationCode(passwordEncoder.encode(verificationCode));

        //TODO: Add verification code generation date and datetime to check expiration

        userRepository.save(user);

        System.out.println("Your one time generated password: " + verificationCode);
    }

    public User checkEmailVerificationCode(User user, String verificationCode) {
        if(user.getEmail() == null) {
            throw new EmailNotAddedException();
        }
        if(!user.isEmailVerificationCodeValid()) {
            throw new VerificationCodeExpiredException();
        }
        if(passwordEncoder.matches(verificationCode, user.getEmailVerificationCode())) {
            user.setEmailCodeGenerationDate(null);
            user.setEmailVerificationCode(null);
            return userRepository.save(user);
        } else {
            throw new IncorrectVerificationCodeException();
        }
    }

    public boolean isUserVerified(String token) {
        User user = getUserFromAccessToken(token);
        return user.isVerified();
    }

    @Override
    public UserDetails loadUserByUsername(String emailOrPhone) throws UsernameNotFoundException {
        User user = getUserByEmailOrPhone(emailOrPhone);

        Set<GrantedAuthority> grantedAuthorities = user.getAuthorities()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(emailOrPhone, user.getPassword(), grantedAuthorities);
    }

    public User getUserByEmailOrPhone(String emailOrPhone) {
        return userRepository.findByEmailOrPhone(emailOrPhone, emailOrPhone).orElseThrow(UserDoesNotExistException::new);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(UserDoesNotExistException::new);
    }

    public User getUserFromAccessToken(String token) {
        if(!token.startsWith("Bearer")) {
            throw new InvalidBearerTokenException("Token is not a valid Bearer token");
        }
        String strippedToken = token.substring(7);
        if(!tokenService.isTokenAccess(strippedToken)) {
            throw new InvalidTokenException();
        }
        Long id = tokenService.getIdFromToken(strippedToken);
        return getUserById(id);
    }

    public User getUserFromRefreshToken(String refreshToken) {
        Long id = tokenService.getIdFromToken(refreshToken);
        return getUserById(id);
    }

    public User updateGender(User user, Gender gender) {
        user.setGender(gender);
        return userRepository.save(user);
    }

    public User updateLocation(User user, LocationObject location) {
        Location newLocation;
        if(user.getLocation() == null) {
            newLocation = new Location();
        } else {
            newLocation = user.getLocation();
        }
        newLocation.setCity(location.getCity());
        newLocation.setCountry(location.getCountry());
        newLocation.setState(location.getState());
        newLocation.setStreet(location.getStreet());
        newLocation.setZipCode(location.getZip_code());
        locationRepository.save(newLocation);
        user.setLocation(newLocation);

        return userRepository.save(user);
    }

    public String uploadProfilePicture(User user, MultipartFile file) {
        Image image = imageService.uploadImage(file, "pfp");
        user.setProfilePicture(image);
        userRepository.save(user);

        return "Profile picture saved successfully";
    }

}
