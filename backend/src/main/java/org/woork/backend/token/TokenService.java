package org.woork.backend.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.InvalidTokenException;
import org.woork.backend.exceptions.RefreshTokenExpiredException;
import org.woork.backend.exceptions.UserDoesNotExistException;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

//Refresh token cookie name is "user_r"

@Service
public class TokenService {
    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Autowired
    public TokenService(
            JwtEncoder jwtEncoder,
            JwtDecoder jwtDecoder,
            RefreshTokenRepository refreshTokenRepository,
            UserRepository userRepository
    ) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public String generateRefreshToken(User user) {
        Instant now = Instant.now();

        String scope = user.getAuthorities()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()).toString())
                .collect(Collectors.joining(""));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(24*7, ChronoUnit.HOURS))
                .subject(user.getUsername())
                .claim("scope", scope)
                .claim("type", "refresh")
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateAccessToken(User user) {
        Instant now = Instant.now();

        String scope = user.getAuthorities()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()).toString())
                .collect(Collectors.joining(""));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(24*7, ChronoUnit.HOURS))
                .subject(user.getUsername())
                .claim("scope", scope)
                .claim("type", "access")
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }


    public boolean isTokenRefresh(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        return decoded.getClaim("type").equals("refresh");
    }

    public boolean isTokenRefresh(Jwt decoded) {
        return decoded.getClaim("type").equals("refresh");
    }

    public String extractUsername(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        return decoded.getSubject();
    }

    public boolean isTokenValid(String token) {
        Jwt decoded = jwtDecoder.decode(token);

        if(refreshTokenRepository.findByToken(decoded.getTokenValue()).isPresent())
            return false;

        return Objects.requireNonNull(decoded.getExpiresAt()).isAfter(Instant.now());
    }

    public String getNewAccessToken(User user, String refreshToken) {
        if(!isTokenRefresh(refreshToken)) {
            throw new InvalidTokenException();
        }
        if(!isTokenValid(refreshToken)) {
            throw new RefreshTokenExpiredException();
        }
        return generateAccessToken(user);
    }

    public ResponseCookie generateTokenCookie(String token) {
        return ResponseCookie.from("user_r", token)
                .path("/")
                .httpOnly(true)
                .maxAge(3600*24*7)
                .sameSite("Lax")
                .secure(true)
                .build();
    }

    public ResponseCookie generateLogoutCookie() {
        return ResponseCookie.from("user_r", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .sameSite("Lax")
                .build();
    }

    public void blackListRefreshToken(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        if(!isTokenRefresh(decoded)) {
            throw new InvalidTokenException();
        }
        Instant expiresAt = decoded.getExpiresAt();
        RefreshTokenBlacklist refreshToken = RefreshTokenBlacklist.builder()
            .token(token)
            .expiresAt(expiresAt)
            .build();

        refreshTokenRepository.save(refreshToken);
    }

    public void flushExpiredBlackListRefreshTokens() {
        List<RefreshTokenBlacklist> refreshTokenBlacklist = refreshTokenRepository.findAll();
        for(RefreshTokenBlacklist refreshTokenBlacklistItem : refreshTokenBlacklist) {
            if(refreshTokenBlacklistItem.isTokenExpired()) {
                refreshTokenRepository.delete(refreshTokenBlacklistItem);
            }
        }
    }

    public User getUserFromAccessToken(String token) {
        if(!token.startsWith("Bearer")) {
            throw new InvalidBearerTokenException("Token is not a valid Bearer token");
        }
        String strippedToken = token.substring(7);
        if(!isTokenValid(strippedToken)) {
            throw new InvalidBearerTokenException("Invalid token.");
        }
        String username = extractUsername(strippedToken);
        return userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }
}
