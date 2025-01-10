package org.woork.backend.exceptions.exceptions;

public class CouldNotVerifyUserException extends DefaultException {
    private static final String code = "verification_failure";

    public CouldNotVerifyUserException(String message) {
        super(message, code);
    }
}
