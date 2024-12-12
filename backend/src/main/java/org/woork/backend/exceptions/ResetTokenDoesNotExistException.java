package org.woork.backend.exceptions;

import java.io.Serial;

public class ResetTokenDoesNotExistException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public ResetTokenDoesNotExistException(String message) {
        super(message);
    }
}
