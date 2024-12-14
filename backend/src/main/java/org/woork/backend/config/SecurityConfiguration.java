package org.woork.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Autowired
    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(UserDetailsService detailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(detailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(provider);
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authorize) -> authorize
                        //AUTH
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/auth/forgot-password/"
                        ).anonymous()
                        .requestMatchers(
                                "/api/auth/reset-password/**"
                        ).permitAll()
                        .requestMatchers(
                                "/api/auth/email/update",
                                "/api/auth/verify-email/**",
                                "/api/auth/logout",
                                "/api/auth/verify-phone/**",
                                "/api/auth/email/**",
                                "/api/auth/phone/**",
                                "/api/auth/forgot-password/authenticated"
                        ).authenticated()
                        //POSTING
                        .requestMatchers(
                                "/api/posting/{id}"
                        ).permitAll()
                        .requestMatchers(
                                "/api/posting/create"
                        ).authenticated()
                        //WS
                        .requestMatchers("/ws").permitAll()
                        //USER
                        .requestMatchers("/api/user/**").authenticated()
                        //EXPLORE
                        .requestMatchers("/api/explore").permitAll()
                        //ADDRESS
                        .requestMatchers("/api/location/**").permitAll()
                        //NOTIFICATIONS
                        .requestMatchers(
                                "/api/notification/**"
                        ).authenticated()
                        //PROFILE
                        .requestMatchers(
                                "/api/profile/**"
                        ).authenticated()
                        .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}