package org.woork.backend.exceptions.exceptions;

public class AuthenticationErrorException extends DefaultException {
    private static final String code = "authentication_error";

    public AuthenticationErrorException(String message) {
        super(message, code);
    }
}
