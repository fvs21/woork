package org.woork.backend.annotations;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.woork.backend.user.UserService;

@Aspect
@Component
public class AuthenticatedAspect {
    private final UserService userService;

    @Autowired
    public AuthenticatedAspect(UserService userService) {
        this.userService = userService;
    }

    @Before("@annotation(authenticated)")
    public void isAuthenticated(JoinPoint joinPoint, Authenticated authenticated) {

    }
}
