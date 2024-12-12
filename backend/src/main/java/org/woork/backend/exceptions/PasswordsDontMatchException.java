package org.woork.backend.exceptions;

public class PasswordsDontMatchException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public PasswordsDontMatchException() {
        super("Passwords don't match!");
    }
}
