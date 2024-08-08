package org.woork.backend.user;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.woork.backend.authentication.RegistrationDTO;
import org.woork.backend.exceptions.*;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.location.Location;
import org.woork.backend.location.LocationDTO;
import org.woork.backend.location.LocationService;
import org.woork.backend.posting.Posting;
import org.woork.backend.posting.PostingDTO;
import org.woork.backend.posting.PostingService;
import org.woork.backend.role.Role;
import org.woork.backend.role.RoleRepository;
import org.woork.backend.sms.SMSService;
import org.woork.backend.token.TokenService;
import org.woork.backend.utils.RegistrationUtils;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final TokenService tokenService;
    private final LocationService locationService;
    private final ImageService imageService;
    private final SMSService smsService;
    private final PostingService postingService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository, TokenService tokenService,
                       LocationService locationService, ImageService imageService, SMSService smsService,
                       PostingService postingService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.tokenService = tokenService;
        this.locationService = locationService;
        this.imageService = imageService;
        this.smsService = smsService;
        this.postingService = postingService;
    }

    public UserDTO userToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setAuthorities(user.getAuthorities());
        userDTO.setCountryCode(user.getCountryCode());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setFirstName(user.getFirst_name());
        userDTO.setLastName(user.getLast_name());
        userDTO.setPhone(user.getPhone());
        userDTO.setEmail(user.getEmail());
        userDTO.setLocation(user.getLocation());
        userDTO.setGender(user.getGender());
        userDTO.setVerified(user.isVerified());
        userDTO.setEmailVerified(user.isEmailVerified());

        Set<PostingDTO> postingsDtos = new HashSet<>();
        for(Posting posting : user.getPostings()) {
            PostingDTO dto = postingService.toDTO(posting);
            postingsDtos.add(dto);
        }

        userDTO.setPostings(postingsDtos);

        try {
            userDTO.setPfpUrl(user.getProfilePicture().getImageUrl());
        } catch (NullPointerException e) {
            userDTO.setPfpUrl(null);
        }

        return userDTO;
    }

    public User registerUser(RegistrationDTO registration) {
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

    public String generateNewPhoneVerificationCode(User user) {
        if(!user.requestPhoneCodeRefreshTime()) {
            throw new UnableToGenerateVerificationCodeException("There is a refresh time between code generation");
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
            return "Phone verification code successfully sent";
        } catch (Exception e) {
            throw new UnableToGenerateVerificationCodeException();
        }
    }

    public String updateEmail(User user, String email) {
        try {
            user.setEmail(email);
            user.setEmailVerified(false);
            String verificationCode = RegistrationUtils.generateVerificationCode();
            System.out.println("Email code: " + verificationCode);
            //sendEmailVerificationCode(email, verificationCode);
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
        //TODO: Add verification code generation date and datetime to check expiration
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
            user.setEmailVerified(true);
            return userRepository.save(user);
        } else {
            throw new IncorrectVerificationCodeException();
        }
    }

    public String generateNewEmailVerificationCode(User user) {
        if(!user.requestEmailCodeRefreshTime()) {
            throw new UnableToGenerateVerificationCodeException("There is a refresh time between code generation");
        }
        if(user.isEmailVerified()) {
            throw new UnableToGenerateVerificationCodeException("User has a verified email");
        }
        try {
            String verificationCode = RegistrationUtils.generateVerificationCode();
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
        Long id = tokenService.getIdFromAccessToken(strippedToken);
        return getUserById(id);
    }

    public User getUserFromRefreshToken(String refreshToken) {
        Long id = tokenService.getIdFromRefreshToken(refreshToken);
        return getUserById(id);
    }

    public UserDTO updateGender(User user, Gender gender) {
        user.setGender(gender);
        return userToDTO(userRepository.save(user));
    }

    public UserDTO updateLocation(User user, LocationDTO locationDTO) {
        Long locationId = user.getLocation().getId();
        Location location = locationService.updateLocation(locationId, locationDTO);
        user.setLocation(location);

        return userToDTO(userRepository.save(user));
    }

    public String uploadProfilePicture(User user, MultipartFile file) {
        Image image = imageService.uploadImage(file, "pfp");
        user.setProfilePicture(image);
        userRepository.save(user);

        return "Profile picture saved successfully";
    }

    public User addPosting(User author, Posting posting) {
        Set<Posting> postings = author.getPostings();
        postings.add(posting);
        author.setPostings(postings);
        return userRepository.save(author);
    }

}