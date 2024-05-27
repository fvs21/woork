package org.woork.backend.exceptions;

public class UnableToUploadImageException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToUploadImageException() {
        super("Unable to upload image");
    }
}
