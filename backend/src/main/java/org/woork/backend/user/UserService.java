package org.woork.backend.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.EmailAlreadyTakenException;
import org.woork.backend.exceptions.PhoneNumberAlreadyTaken;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(RegistrationObject registration) {
        User user = new User(
                registration.getFirstName(),
                registration.getLastName(),
                registration.getPhone(),
                registration.getEmail(),
                registration.getPassword(),
                registration.getDateOfBirth()
        );

        try {
            User saved_user = userRepository.save(user);
            //DO EMAIL VERIFICATION
            return saved_user;
        } catch (Exception e) {
            if(userRepository.findByPhone(registration.getPhone()) != null) {
                throw new PhoneNumberAlreadyTaken();
            } else {
                throw new EmailAlreadyTakenException();
            }
        }
    }
}
