package org.woork.backend.exceptions;

public class UnableToUpdateUserException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToUpdateUserException(String message) {
        super(message);
    }
}
