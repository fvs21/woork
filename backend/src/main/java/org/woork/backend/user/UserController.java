package org.woork.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.exceptions.EmailAlreadyTakenException;
import org.woork.backend.exceptions.IncorrectVerificationCodeException;
import org.woork.backend.exceptions.PhoneNumberAlreadyTakenException;
import org.woork.backend.exceptions.UserDoesNotExistException;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //Exceptions
    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailAlreadyTaken() {
        return new ResponseEntity<>("The email you provided is already taken", HttpStatus.CONFLICT);
    }

    @ExceptionHandler({PhoneNumberAlreadyTakenException.class})
    public ResponseEntity<String> handlePhoneNumberAlreadyTaken() {
        return new ResponseEntity<>("The phone number you provided is already taken", HttpStatus.CONFLICT);
    }

   @ExceptionHandler({IncorrectVerificationCodeException.class})
   public ResponseEntity<String> handleIncorrectVerificationCode() {
        return new ResponseEntity<>("Incorrect verification code", HttpStatus.CONFLICT);
   }

   @ExceptionHandler({UserDoesNotExistException.class})
   public ResponseEntity<String> handleUserDoesNotExist() {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
   }

    //Mappings

    @PostMapping("/register")
    public User register(@RequestBody RegistrationObject registration) {
        return userService.registerUser(registration);
    }

    @PostMapping("/email/send-code")
    public ResponseEntity<String> sendVerificationEmail(@RequestBody LinkedHashMap<String, String> body) {
        userService.sendEmailVerificationCode(body.get("email"));
        return new ResponseEntity<>("Verification code sent", HttpStatus.OK);
    }

    @PostMapping("/email/verify")
    public User verifyEmail(@RequestBody LinkedHashMap<String, String> body) {
        String email = body.get("email");
        String code = body.get("otp");

        return userService.checkVerificationCode(email, code);
    }

//    @PutMapping("/change/password")
//    public ResponseEntity<String> changePassword(@RequestBody LinkedHashMap<String, String> body) {
//        String email = body.get("email");
//        String currentPassword = body.get("password");
//        String newPassword = body.get("new_password");
//
//        return userService.changePassword(email, currentPassword, newPassword);
//    }
}
