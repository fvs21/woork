package org.woork.backend.exceptions;

public class RefreshTokenNotPresentException extends DefaultException {
    private static final String code = "auth_token_missing";

    public RefreshTokenNotPresentException() {
        super("Refresh token is not present", code);
    }
}
