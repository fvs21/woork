package org.woork.backend.exceptions;

public class UnableToDeleteImageException extends DefaultException {
    private static final String code = "image_deletion_failure";

    public UnableToDeleteImageException(String message) {
        super(message, code);
    }
}
