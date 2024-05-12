package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.exceptions.EmailAlreadyTakenException;
import org.woork.backend.exceptions.PhoneNumberAlreadyTaken;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailAlreadyTaken() {
        return new ResponseEntity<String>("The email you provided is already taken", HttpStatus.CONFLICT);
    }

    @ExceptionHandler({PhoneNumberAlreadyTaken.class})
    public ResponseEntity<String> handlePhoneNumberAlreadyTaken() {
        return new ResponseEntity<String>("The phone number you provided is already taken", HttpStatus.CONFLICT);
    }

    @PostMapping("/register")
    public User register(@RequestBody RegistrationObject registration) {
        return userService.registerUser(registration);
    }

    @PostMapping("/email/send-code")
    public ResponseEntity<String> sendVerificationEmail(@RequestBody LinkedHashMap<String, String> body) {
        return new ResponseEntity<>("TODO", HttpStatus.OK);
    }

    @PostMapping("/email/verify")
    public ResponseEntity<String> verifyEmail(@RequestBody LinkedHashMap<String, String> body) {
        return new ResponseEntity<>("TODO", HttpStatus.OK);
    }
}
