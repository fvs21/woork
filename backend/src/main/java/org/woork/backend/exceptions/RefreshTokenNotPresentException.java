package org.woork.backend.exceptions;

public class RefreshTokenNotPresentException extends RuntimeException {
    public RefreshTokenNotPresentException() {
        super("Refresh token is not present");
    }
}
