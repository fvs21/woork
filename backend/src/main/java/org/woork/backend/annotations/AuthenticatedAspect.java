package org.woork.backend.annotations;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.woork.backend.exceptions.InvalidLocationException;
import org.woork.backend.exceptions.InvalidTokenException;
import org.woork.backend.token.TokenService;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;

import java.util.Objects;

@Aspect
@Component
public class AuthenticatedAspect {
    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public AuthenticatedAspect(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    private String getBearerTokenHeader() {
        return ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest().getHeader("Authorization");
    }

    @Before("@annotation(authenticated)")
    public void isAuthenticated(JoinPoint joinPoint, Authenticated authenticated) {
        try {
            String token = getBearerTokenHeader();
            if(!tokenService.isTokenValid(token))
                throw new InvalidTokenException();
        } catch(NullPointerException | InvalidLocationException e) {
            throw new InvalidTokenException();
        }
    }
}
