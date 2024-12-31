package org.woork.backend.exceptions.exceptions;

public class AccessTokenExpiredException extends DefaultException {
    private static final String code = "auth_token_expired";

    public AccessTokenExpiredException() {
        super("Access token has expired", code);
    }
}
