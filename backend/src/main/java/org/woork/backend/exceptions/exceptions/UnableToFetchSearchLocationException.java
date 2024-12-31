package org.woork.backend.exceptions.exceptions;

public class UnableToFetchSearchLocationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToFetchSearchLocationException(String message) {
        super(message);
    }
}
