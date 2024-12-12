package org.woork.backend.exceptions;

public class CannotRequestResetPasswordException extends RuntimeException {
    private final static long serialVersionUID = 1L;

    public CannotRequestResetPasswordException(String message) {
        super(message);
    }
}
