package org.woork.backend.exceptions;

public class InvalidTokenException extends DefaultException {
    private static final String code = "invalid_token";

    public InvalidTokenException() {
        super("Invalid token", code);
    }
}
