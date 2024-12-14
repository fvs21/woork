package org.woork.backend.exceptions;

public class UnableToDeleteImageException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToDeleteImageException(String message) {
        super(message);
    }
}
