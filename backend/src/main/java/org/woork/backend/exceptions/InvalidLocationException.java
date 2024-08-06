package org.woork.backend.exceptions;

public class InvalidLocationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidLocationException() {
        super("Invalid country, city or state");
    }
}
