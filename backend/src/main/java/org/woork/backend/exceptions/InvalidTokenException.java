package org.woork.backend.exceptions;

public class InvalidTokenException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidTokenException() {
        super("Invalid token");
    }
}
