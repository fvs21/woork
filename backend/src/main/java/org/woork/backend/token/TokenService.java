package org.woork.backend.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.InvalidTokenException;
import org.woork.backend.exceptions.RefreshTokenExpiredException;
import org.woork.backend.exceptions.VerificationCodeExpiredException;
import org.woork.backend.user.User;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class TokenService {
    private JwtEncoder jwtEncoder;
    private JwtDecoder jwtDecoder;
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public TokenService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder, RefreshTokenRepository refreshTokenRepository) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
        this.refreshTokenRepository = refreshTokenRepository;
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
                .subject(user.getId().toString())
                .claim("scope", scope)
                .claim("type", "refresh")
                .claim("verified", user.isVerified())
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateRefreshToken(Authentication authentication) {
        Instant now = Instant.now();

        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(24*7, ChronoUnit.HOURS))
                .subject(authentication.getName())
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
                .subject(user.getId().toString())
                .claim("scope", scope)
                .claim("type", "access")
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public String generateAccessToken(Authentication authentication) {
        Instant now = Instant.now();

        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(5, ChronoUnit.MINUTES))
                .subject(authentication.getName())
                .claim("scope", scope)
                .claim("type", "access")
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    public boolean isTokenAccess(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        return decoded.getClaim("type").equals("access");
    }

    public boolean isTokenRefresh(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        return decoded.getClaim("type").equals("refresh");
    }

    private boolean isTokenAccess(Jwt decoded) {
        return decoded.getClaim("type").equals("access");
    }

    public boolean isTokenRefresh(Jwt decoded) {
        return decoded.getClaim("type").equals("refresh");
    }

    public Long getIdFromAccessToken(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        if(!validateToken(decoded)) {
            throw new VerificationCodeExpiredException();
        }
        if(!isTokenAccess(decoded)) {
            throw new InvalidTokenException();
        }
        return Long.valueOf(decoded.getSubject());
    }

    public Long getIdFromRefreshToken(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        if(!isTokenRefresh(decoded)) {
            throw new InvalidTokenException();
        }
        if(!validateToken(decoded)) {
            throw new RefreshTokenExpiredException();
        }
        return Long.valueOf(decoded.getSubject());
    }

    public boolean validateToken(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        return !decoded.getExpiresAt().isBefore(Instant.now());
    }

    private boolean validateToken(Jwt decoded) {
        return !decoded.getExpiresAt().isBefore(Instant.now());
    }

    public String getNewAccessToken(User user, String refreshToken) {
        if(!isTokenRefresh(refreshToken)) {
            throw new InvalidTokenException();
        }
        if(!validateToken(refreshToken)) {
            throw new RefreshTokenExpiredException();
        }
        return generateAccessToken(user);
    }

    public ResponseCookie generateTokenCookie(String token) {
        return ResponseCookie.from("refresh_token", token)
                .path("/")
                .httpOnly(true)
                .maxAge(3600*24*7)
                .sameSite("Lax")
                .build();
    }

    public ResponseCookie generateLogoutCookie() {
        return ResponseCookie.from("refresh_token", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .sameSite("Lax")
                .build();
    }
}
