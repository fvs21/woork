package org.woork.backend.exceptions.exceptions;

public class CannotRequestResetPasswordException extends DefaultException {
    private final static String code = "recently_updated_password";

    public CannotRequestResetPasswordException(String message) {
        super(message, code);
    }
}
