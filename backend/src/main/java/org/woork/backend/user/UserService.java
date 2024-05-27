package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.authentication.RegistrationObject;
import org.woork.backend.exceptions.EmailAlreadyTakenException;
import org.woork.backend.exceptions.IncorrectVerificationCodeException;
import org.woork.backend.exceptions.PhoneNumberAlreadyTakenException;
import org.woork.backend.exceptions.UserDoesNotExistException;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.location.Location;
import org.woork.backend.location.LocationObject;
import org.woork.backend.location.LocationRepository;
import org.woork.backend.role.Role;
import org.woork.backend.role.RoleRepository;
import org.woork.backend.token.TokenService;
import java.security.SecureRandom;
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

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       RoleRepository roleRepository, TokenService tokenService,
                       LocationRepository locationRepository, ImageService imageService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.tokenService = tokenService;
        this.locationRepository = locationRepository;
        this.imageService = imageService;
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
            User saved_user = userRepository.save(user);
            //DO EMAIL OR PHONE VERIFICATION
            return saved_user;
        } catch (Exception e) {
            throw new PhoneNumberAlreadyTakenException();
        }
    }

    public User updateEmail(String phone, String email) {
        User user = userRepository.findByPhone(phone).orElseThrow(UserDoesNotExistException::new);
        user.setEmail(email);
        return userRepository.save(user);
    }

    private String generateVerificationCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder();

        for(int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString();
    }

    public void sendEmailVerificationCode(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(UserDoesNotExistException::new);
        String verificationCode = generateVerificationCode();
        user.setVerificationCode(passwordEncoder.encode(verificationCode));

        //TODO: Add verification code generation date and datetime to check expiration

        userRepository.save(user);

        System.out.println("Your one time generated password: " + verificationCode);
    }

    public User checkVerificationCode(String email, String verificationCode) {
        User user = userRepository.findByEmail(email).orElseThrow(UserDoesNotExistException::new);

        //TODO: Check verification code expiration

        if(passwordEncoder.matches(verificationCode, user.getVerificationCode())) {
            user.setVerificationCode(null);
            user.setVerified(true);
            userRepository.save(user);
            return user;
        } else {
            throw new IncorrectVerificationCodeException();
        }
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

    public User getUserFromToken(String token) {
        String phoneOrEmail = "";
        if(token.startsWith("Bearer")) {
            String strippedToken = token.substring(7);
            phoneOrEmail = tokenService.getPhoneOrEmailFromToken(strippedToken);
        }
        return getUserByEmailOrPhone(phoneOrEmail);
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
