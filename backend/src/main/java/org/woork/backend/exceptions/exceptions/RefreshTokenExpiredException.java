package org.woork.backend.exceptions.exceptions;

public class RefreshTokenExpiredException extends DefaultException {
    private static final String code = "auth_token_expired";

    public RefreshTokenExpiredException() {
        super("Refresh token has expired", code);
    }
}
