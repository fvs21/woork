package org.woork.backend.exceptions;

public class UnsupportedImageTypeException extends DefaultException {
    private static final String code = "unsupported_image_type";

    public UnsupportedImageTypeException() {
        super("Unsupported image type", code);
    }
}
