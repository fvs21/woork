package org.woork.backend.exceptions;

public class RefreshTokenExpiredException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RefreshTokenExpiredException() {
        super("Refresh token has expired");
    }
}
