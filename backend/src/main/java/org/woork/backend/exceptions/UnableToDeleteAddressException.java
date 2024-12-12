package org.woork.backend.exceptions;

public class UnableToDeleteAddressException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToDeleteAddressException(String message) {
        super(message);
    }
}
