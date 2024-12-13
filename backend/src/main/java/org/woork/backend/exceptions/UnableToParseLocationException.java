package org.woork.backend.exceptions;

public class UnableToParseLocationException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToParseLocationException() {
        super("Unable to parse location");
    }

    public UnableToParseLocationException(String message) {
        super(message);
    }
}
