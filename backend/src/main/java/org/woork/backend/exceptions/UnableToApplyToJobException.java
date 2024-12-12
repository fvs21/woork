package org.woork.backend.exceptions;

public class UnableToApplyToJobException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToApplyToJobException(String message) {
        super(message);
    }
}
