package org.woork.backend.exceptions;

public class AccessTokenExpiredException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AccessTokenExpiredException() {
        super("Access token has expired");
    }
}
