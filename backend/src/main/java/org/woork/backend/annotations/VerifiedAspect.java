package org.woork.backend.annotations;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.woork.backend.exceptions.UserNotVerifiedException;
import org.woork.backend.user.UserService;

@Aspect
@Component
public class VerifiedAspect {
    private final UserService userService;

    @Autowired
    public VerifiedAspect(UserService userService) {
        this.userService = userService;
    }

    @Before("@annotation(verified)")
    public void isVerified(JoinPoint joinPoint, Verified verified) {
        Object[] args = joinPoint.getArgs();

        String token = (String) args[0];

        if(!userService.isUserVerified(token)) {
            throw new UserNotVerifiedException();
        }
    }
}
