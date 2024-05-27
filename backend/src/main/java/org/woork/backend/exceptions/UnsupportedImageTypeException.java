package org.woork.backend.exceptions;

public class UnsupportedImageTypeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnsupportedImageTypeException() {
        super("Unsupported image type");
    }
}
