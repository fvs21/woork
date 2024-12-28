package org.woork.backend.exceptions.exceptions;

public class UnableToDeleteAddressException extends DefaultException {
    private static final String code = "unable_to_delete_address";

    public UnableToDeleteAddressException(String message) {
        super(message, code);
    }
}
