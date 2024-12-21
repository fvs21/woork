package org.woork.backend.exceptions;

public class InvalidLocationException extends DefaultException {
    private static final String code = "invalid_address";

    public InvalidLocationException() {
        super("Invalid country, city or state", code);
    }
}
