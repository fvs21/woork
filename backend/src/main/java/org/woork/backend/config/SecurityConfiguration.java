package org.woork.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;

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
                .headers(headers ->
                    headers.frameOptions(frameOptionsConfig -> frameOptionsConfig.sameOrigin())
                )
                .authorizeHttpRequests((authorize) -> authorize
                        //AUTH
                        .requestMatchers(HttpMethod.OPTIONS).permitAll()
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/auth/forgot-password/"
                        ).anonymous()
                        .requestMatchers(
                                "/api/auth/reset-password/**"
                        ).permitAll()
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/auth/logout"
                        ).authenticated()
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/verify-email/**",
                                "/api/auth/verify-phone/**",
                                "/api/auth/forgot-password/authenticated"
                        ).authenticated()
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/auth/email/update",
                                "/api/auth/phone/update",
                                "/api/auth/password/update"
                        ).authenticated()
                        //POSTING
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/posting/{id}"
                        ).permitAll()
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/posting/create",
                                "/api/posting/posting/apply"
                        ).authenticated()
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/posting/address/{id}",
                                "/api/posting/{id}"
                        ).authenticated()
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/posting/addresses",
                                "/api/posting/{id}/applicants"
                        ).authenticated()
                        //WS
                        .requestMatchers("/ws/**").permitAll()
                        //USER
                        .requestMatchers("/api/user/**").authenticated()
                        //EXPLORE
                        .requestMatchers("/api/explore/**").permitAll()
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

                        //WORKER
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/worker/register"
                        ).authenticated()
                        //PENDING JOBS
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/pending_jobs"
                        ).authenticated()
                        //CHATS
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/chats/**"
                        ).authenticated()
                        .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}