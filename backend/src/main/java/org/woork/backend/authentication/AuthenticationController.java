package org.woork.backend.authentication;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.annotations.Verified;
import org.woork.backend.exceptions.*;
import org.woork.backend.token.TokenService;
import org.woork.backend.user.User;
import org.woork.backend.user.UserDTO;
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
    @ExceptionHandler({
            EmailAlreadyTakenException.class,
            PhoneNumberAlreadyTakenException.class,
            IncorrectVerificationCodeException.class,
            EmailNotAddedException.class,
            UnableToGenerateVerificationCodeException.class})
    public ResponseEntity<String> handleConflictedRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleNotFoundRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({
            IncorrectCredentialsException.class,
            CredentialsNotProvidedException.class,
            InvalidPhoneNumberException.class,
            InvalidCountryCodeException.class,
            InvalidTokenException.class,
            InvalidBearerTokenException.class,
            RegistrationException.class,
            VerificationCodeExpiredException.class
    })
    public ResponseEntity<String> handleBadRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AuthenticationErrorException.class})
    public ResponseEntity<String> handleInternalServerError(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({
            UserNotVerifiedException.class,
            RefreshTokenExpiredException.class,
            AccessTokenExpiredException.class,
    })
    public ResponseEntity<String> handleUnauthorizedRequest(Exception e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    //Mappings

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid RegistrationDTO registration,
                                                           BindingResult bindingResult, HttpServletResponse response) {
        if(bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(fieldError -> {
                throw new RegistrationException(fieldError.getDefaultMessage());
            });
        }

        User user = userService.registerUser(registration);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            (registration.getCountryCode() + registration.getPhone()),
                            registration.getPassword()
                    )
            );
            String accessToken = tokenService.generateAccessToken(user);
            AuthenticationResponse authResponse = new AuthenticationResponse(
                    userService.userToDTO(user),
                    accessToken);

            String refreshToken = tokenService.generateRefreshToken(user);

            response.addHeader(HttpHeaders.SET_COOKIE, tokenService.generateTokenCookie(refreshToken).toString());

            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        } catch (AuthenticationException e) {
            throw new AuthenticationErrorException();
        }
    }

    @PutMapping("/phone/update")
    public String updatePhoneNumber(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                  @RequestBody LinkedHashMap<String, String> body, HttpServletResponse response) {
        String countryCode = body.get("countryCode");
        String phoneNumber = body.get("phone");

        User user = userService.getUserFromAccessToken(token);
        String responseMsg = userService.updatePhoneNumber(user, countryCode, phoneNumber);

        String refreshToken = tokenService.generateRefreshToken(user);
        response.addHeader(HttpHeaders.SET_COOKIE, tokenService.generateTokenCookie(refreshToken).toString());

        return responseMsg;
    }

    @PostMapping("/phone/code")
    public String generatePhoneVerificationCode(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        User user = userService.getUserFromAccessToken(token);
        return userService.generateNewPhoneVerificationCode(user);
    }

    @PostMapping("/phone/verify")
    public UserDTO verifyPhoneNumber(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                    @RequestBody LinkedHashMap<String, String> body, HttpServletResponse response) {
        String verificationCode = body.get("otp");

        User user = userService.getUserFromAccessToken(token);

        UserDTO userDTO = userService.checkPhoneVerificationCode(
                user,
                verificationCode
        );

        String refreshToken = tokenService.generateRefreshToken(user);
        response.addHeader(HttpHeaders.SET_COOKIE, tokenService.generateTokenCookie(refreshToken).toString());
        return userDTO;
    }

    @Verified
    @PutMapping("/email/update")
    public String updateEmail(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody LinkedHashMap<String, String> body) {
        User user = userService.getUserFromAccessToken(token);
        String email = body.get("email");

        return userService.updateEmail(user, email);
    }

    @Verified
    @PostMapping("/email/code")
    public String generateEmailVerificationCode(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        User user = userService.getUserFromAccessToken(token);
        return userService.generateNewEmailVerificationCode(user);
    }

    @Verified
    @PostMapping("/email/verify")
    public UserDTO verifyEmail(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                               @RequestBody LinkedHashMap<String, String> body) {

        User user = userService.getUserFromAccessToken(token);
        String code = body.get("otp");

        return userService.checkEmailVerificationCode(user, code);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LinkedHashMap<String, String> body, HttpServletResponse response) {
        String phoneOrEmail = body.get("credential");
        String password = body.get("password");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(phoneOrEmail, password)
            );
            User user = userService.getUserByEmailOrPhone(phoneOrEmail);

            String refreshToken = tokenService.generateRefreshToken(user);

            response.addHeader(HttpHeaders.SET_COOKIE, tokenService.generateTokenCookie(refreshToken).toString());

            String token = tokenService.generateAccessToken(user);
            return new AuthenticationResponse(
                    userService.userToDTO(user),
                    token
            );
        } catch (AuthenticationException | UserDoesNotExistException e) {
            throw new IncorrectCredentialsException();
        }
    }

    @GetMapping("/refresh")
    public String refresh(@CookieValue("user_r") String token) {
        User user = userService.getUserFromRefreshToken(token);
        String access_token = tokenService.getNewAccessToken(user, token);

        return access_token;
    }

    @GetMapping("/logout")
    public String logout(@CookieValue("user_r") String token, HttpServletResponse response) {
        userService.getUserFromRefreshToken(token);
        tokenService.blackListRefreshToken(token);
        response.addHeader(HttpHeaders.SET_COOKIE, tokenService.generateLogoutCookie().toString());

        return "Logged out successfully";
    }
}
