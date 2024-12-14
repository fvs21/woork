package org.woork.backend.authentication;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.woork.backend.annotations.Authenticated;
import org.woork.backend.authentication.requests.RegistrationRequest;
import org.woork.backend.authentication.requests.ResetPasswordRequest;
import org.woork.backend.authentication.responses.AuthenticationResponse;
import org.woork.backend.authentication.responses.ResetTokenExistsResponse;
import org.woork.backend.exceptions.*;
import org.woork.backend.token.TokenService;
import org.woork.backend.user.User;
import org.woork.backend.user.resources.UserResource;
import org.woork.backend.user.UserService;
import org.woork.backend.utils.AuthenticationUtils;
import org.woork.backend.validators.ValidatorImpl;

import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {
    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationService authenticationService;
    private final ValidatorImpl validatorImpl;

    @Autowired
    public AuthenticationController(UserService userService, TokenService tokenService, AuthenticationService authenticationService, ValidatorImpl validatorImpl) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.authenticationService = authenticationService;
        this.validatorImpl = validatorImpl;
    }

    //Mappings

    @PostMapping("/register")
    public AuthenticationResponse register(
            @RequestBody @Valid RegistrationRequest registration,
            BindingResult bindingResult, HttpServletResponse response,
            @CookieValue("user_r") Optional<String> token
    ) {
        if(bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(fieldError -> {
                throw new RegistrationException(fieldError.getDefaultMessage());
            });
        }
        if(token.orElse(null) != null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Forbidden"
            );
        }

        User user = authenticationService.register(registration);
        HashMap<String, String> tokens = authenticationService.authenticate(
                user.getPhone(),
                registration.getPassword()
        );
        response.addHeader(
                HttpHeaders.SET_COOKIE,
                tokenService.generateTokenCookie(tokens.get("refreshToken")).toString()
        );
        return new AuthenticationResponse(
                new UserResource(user),
                tokens.get("accessToken")
        );
    }

    @PutMapping("/phone/update")
    public UserResource updatePhoneNumber(
            @RequestBody LinkedHashMap<String, String> body
    ) {
        String countryCode = body.get("countryCode");
        String phoneNumber = body.get("phone");

        User user = authenticationService.getCurrentUser();
        authenticationService.updatePhoneNumber(user, countryCode, phoneNumber);

        return new UserResource(user);
    }

    @PostMapping("/verify-phone/resend")
    public String generatePhoneVerificationCode() {
        User user = authenticationService.getCurrentUser();

        return authenticationService.generateNewPhoneVerificationCode(user);
    }

    @PostMapping("/verify-phone")
    public UserResource verifyPhoneNumber(
            @RequestBody LinkedHashMap<String, String> body
    ) {
        String verificationCode = body.get("otp");

        User user = authenticationService.getCurrentUser();

        authenticationService.checkPhoneVerificationCode(
                user,
                verificationCode
        );

        return new UserResource(user);
    }

    @PutMapping("/email/update")
    @Authenticated
    public UserResource updateEmail(
            @RequestBody LinkedHashMap<String, String> body
    ) {
        User user = authenticationService.getCurrentUser();
        String email = body.get("email");

        authenticationService.updateEmail(user, email);
        return new UserResource(user);
    }

    @Authenticated
    @PostMapping("/verify-email/resend")
    public String generateEmailVerificationCode() {
        User user = authenticationService.getCurrentUser();
        return authenticationService.generateNewEmailVerificationCode(user);
    }

    @Authenticated
    @PostMapping("/verify-email")
    public UserResource verifyEmail(
            @RequestBody LinkedHashMap<String, String> body
    ) {

        User user = authenticationService.getCurrentUser();
        String code = body.get("otp");

        authenticationService.checkEmailVerificationCode(user, code);
        return new UserResource(user);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(
            @RequestBody LinkedHashMap<String, String> body,
            HttpServletResponse response,
            @CookieValue("user_r") Optional<String> token
    ) {
        if(token.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Forbidden"
            );
        }

        String phoneOrEmail = body.get("credential");
        String password = body.get("password");

        HashMap<String, String> tokens = authenticationService.authenticate(
                phoneOrEmail,
                password
        );

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                tokenService.generateTokenCookie(tokens.get("refreshToken")).toString()
        );
        return new AuthenticationResponse(
                new UserResource((User) userService.loadUserByUsername(phoneOrEmail)),
                tokens.get("accessToken")
        );
    }

    @GetMapping("/refresh")
    public String refresh(@CookieValue("user_r") String token) {
        User user = userService.getUserFromRefreshToken(token);
        return tokenService.getNewAccessToken(user, token);
    }

    @GetMapping("/logout")
    public String logout(@CookieValue("user_r") String token, HttpServletResponse response) {
        if(!tokenService.isTokenValid(token) || !tokenService.isTokenRefresh(token))
            throw new InvalidTokenException();

        tokenService.blackListRefreshToken(token);
        response.addHeader(HttpHeaders.SET_COOKIE, tokenService.generateLogoutCookie().toString());
        return "Logged out successfully";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody LinkedHashMap<String, String> body, HttpServletResponse response) {
        String credential = body.get("credential");

        return authenticationService.sendPasswordResetLink(credential);
    }

    @PostMapping("/forgot-password/authenticated")
    public Map<String, String> forgotPasswordAuthenticated() {
        User user = authenticationService.getCurrentUser();
        String mean = user.getEmail() == null ? "phone" : "email";
        String message = authenticationService.sendPasswordResetLink(mean.equals("phone") ? user.getPhone() : user.getEmail());
        return Map.of(
                "message", message,
                "mean", mean
        );
    }


    @GetMapping("/reset-password/verification")
    public ResetTokenExistsResponse verifyResetTokenExists(
            @RequestParam("token") String token
    ) {
        if(authenticationService.resetTokenExists(token)) {
            return ResetTokenExistsResponse.builder()
                    .exists(true)
                    .build();
        } else {
            return ResetTokenExistsResponse.builder()
                    .exists(false)
                    .build();
        }
    }

    @PostMapping("/reset-password")
    public String resetPassword(ResetPasswordRequest request) {
        validatorImpl.validateFields(request);
        return authenticationService.resetPassword(
                request.getToken(),
                request.getPassword(),
                request.getConfirmPassword()
        );


    }
}
