package org.woork.backend.exceptions.exceptions;

public abstract class DefaultException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private final String code;

    public DefaultException(String message, String code) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
