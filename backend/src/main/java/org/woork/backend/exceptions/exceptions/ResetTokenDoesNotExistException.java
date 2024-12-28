package org.woork.backend.exceptions.exceptions;

import java.io.Serial;

public class ResetTokenDoesNotExistException extends DefaultException {
    private static String code = "reset_token_does_not_exist";

    public ResetTokenDoesNotExistException(String message) {
        super(message, code);
    }
}
