package org.woork.backend.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

    @ExceptionHandler({AuthenticationErrorException.class})
    public ResponseEntity<String> handleAuthenticationError(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({InvalidPhoneNumberException.class})
    public ResponseEntity<String> handleInvalidPhoneNumber(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //Mappings

    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody RegistrationObject registration) {
        User user = userService.registerUser(registration);
        AuthenticationResponse authResponse = new AuthenticationResponse();
        authResponse.setUser(user);

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            (registration.getCountryCode() + registration.getPhone()),
                            registration.getPassword()
                    )
            );
            String token = tokenService.generateToken(auth);
            authResponse.setAccess_token(token);
            return authResponse;
        } catch (AuthenticationException e) {
            throw new AuthenticationErrorException();
        }
    }

    @PutMapping("/phone/update")
    public String updatePhoneNumber(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                  @RequestBody LinkedHashMap<String, String> body) {
        String countryCode = body.get("countryCode");
        String phoneNumber = body.get("phoneNumber");

        User user = userService.getUserFromToken(token);

        return userService.updatePhoneNumber(user, countryCode, phoneNumber);
    }

    @PostMapping("/phone/verify")
    public User verifyPhoneNumber(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                    @RequestBody LinkedHashMap<String, String> body) {
        User user = userService.getUserFromToken(token);
        String verificationCode = body.get("otp");

        return userService.checkPhoneVerificationCode(user, verificationCode);
    }

    @PutMapping("/email/update")
    public String updateEmail(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody LinkedHashMap<String, String> body) {
        User user = userService.getUserFromToken(token);
        String email = body.get("email");

        return userService.updateEmail(user, email);
    }

    @PostMapping("/email/verify")
    public User verifyEmail(@RequestBody LinkedHashMap<String, String> body) {
        String email = body.get("email");
        String code = body.get("otp");

        return userService.checkEmailVerificationCode(email, code);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LinkedHashMap<String, String> body) {
        String phoneOrEmail = body.get("credential");
        String password = body.get("password");

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(phoneOrEmail, password)
            );
            String token = tokenService.generateToken(auth);
            return new AuthenticationResponse(
                    userService.getUserByEmailOrPhone(phoneOrEmail),
                    token
            );
        } catch (AuthenticationException e) {
            throw new IncorrectCredentialsException();
        }
    }

}
