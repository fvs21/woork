package org.woork.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.exceptions.UserPhoneNotVerifiedException;
import org.woork.backend.user.User;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class PhoneVerificationFilter extends OncePerRequestFilter {

    private final String[] allowedRoutes = {
            "/api/auth/verify-phone",
            "/api/auth/logout",
            "/api/auth/verify-phone/resend",
            "/images/default-pfp",
            "/api/auth/phone/update"
    };

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!user.hasPhoneVerified()) {
            logger.error(user.getPhone() + " is not verified");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getServletPath();
        return SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken
                || Arrays.asList(allowedRoutes).contains(path);
    }
}
