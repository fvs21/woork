package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.EmailAlreadyTakenException;
import org.woork.backend.exceptions.IncorrectVerificationCodeException;
import org.woork.backend.exceptions.PhoneNumberAlreadyTakenException;
import org.woork.backend.exceptions.UserDoesNotExistException;

import java.security.SecureRandom;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegistrationObject registration) {
        User user = new User(
                registration.getFirstName(),
                registration.getLastName(),
                registration.getPhone(),
                registration.getEmail(),
                registration.getDateOfBirth(),
                passwordEncoder.encode(registration.getPassword())
        );

        try {
            User saved_user = userRepository.save(user);
            //DO EMAIL VERIFICATION
            return saved_user;
        } catch (Exception e) {
            if(userRepository.findByPhone(registration.getPhone()) != null) {
                throw new PhoneNumberAlreadyTakenException();
            } else {
                throw new EmailAlreadyTakenException();
            }
        }
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

//    public ResponseEntity<String> changePassword(String email, String currentPassword, String newPassword) {
//        User user = userRepository.findByEmail(email);
//
//        if(user.getPassword().equals(currentPassword)) {
//            user.setPassword(newPassword);
//            return new ResponseEntity<String>("Password changed succesfully", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<String>("Password doesn't match", HttpStatus.BAD_REQUEST);
//        }
//    }
}
