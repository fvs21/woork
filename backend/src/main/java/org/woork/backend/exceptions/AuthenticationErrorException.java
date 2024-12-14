package org.woork.backend.exceptions;

public class AuthenticationErrorException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AuthenticationErrorException() {
        super("Error authenticating user");
    }

    public AuthenticationErrorException(String message) {
        super(message);
    }
}
