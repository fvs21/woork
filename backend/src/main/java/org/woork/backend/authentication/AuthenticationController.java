package org.woork.backend.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.exceptions.*;
import org.woork.backend.token.TokenService;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {
    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationController(UserService userService, TokenService tokenService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    //Exceptions
    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailAlreadyTaken(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({PhoneNumberAlreadyTakenException.class})
    public ResponseEntity<String> handlePhoneNumberAlreadyTaken(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({IncorrectVerificationCodeException.class})
    public ResponseEntity<String> handleIncorrectVerificationCode(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesNotExist(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({CredentialsNotProvidedException.class})
    public ResponseEntity<String> handleCredentialsNotProvided(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({IncorrectCredentialsException.class})
    public ResponseEntity<String> handleIncorrectCredentials(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //Mappings

    @PostMapping("/register")
    public User register(@RequestBody RegistrationObject registration) {
        return userService.registerUser(registration);
    }

    @PutMapping("/email/update")
    public User updateEmail(@RequestBody LinkedHashMap<String, String> body) {
        String phone = body.get("phone");
        String email = body.get("email");

        return userService.updateEmail(phone, email);
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

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LinkedHashMap<String, String> body) {
        String phoneOrEmail;

        if(body.containsKey("phone")) {
            phoneOrEmail = body.get("country_code") + body.get("phone");
        } else if (body.containsKey("email")) {
            phoneOrEmail = body.get("email");
        } else {
            throw new CredentialsNotProvidedException();
        }

        String password = body.get("password");

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(phoneOrEmail, password)
            );
            String token = tokenService.generateToken(auth);
            return new LoginResponse(
                    userService.getUserByEmailOrPhone(phoneOrEmail),
                    token
            );
        } catch (AuthenticationException e) {
            throw new IncorrectCredentialsException();
        }
    }

}
