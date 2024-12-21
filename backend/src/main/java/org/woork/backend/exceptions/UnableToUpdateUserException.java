package org.woork.backend.exceptions;

public class UnableToUpdateUserException extends DefaultException {
    private static final String code = "edit_user_failure";

    public UnableToUpdateUserException(String message) {
        super(message, code);
    }
}
