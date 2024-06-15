package org.woork.backend.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.InvalidTokenException;
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


    public Long getIdFromToken(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        return Long.valueOf(decoded.getSubject());
    }

    public ResponseCookie generateTokenCookie(String token) {
        ResponseCookie cookie = ResponseCookie.from("refresh_token", token)
                .path("/")
                .httpOnly(true)
                .maxAge(3600*24*7)
                .sameSite("Lax")
                .build();
        return cookie;
    }

    public boolean validateRefreshToken(String token) {
        Jwt decoded = jwtDecoder.decode(token);
        return decoded.getClaim("type").equals("refresh") && !decoded.getExpiresAt().isBefore(Instant.now());
    }

    public String getNewAccessToken(User user, String refreshToken) {
        if(!validateRefreshToken(refreshToken)) {
            throw new InvalidTokenException();
        }
        return generateAccessToken(user);
    }
}
