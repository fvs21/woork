package org.woork.backend.exceptions;

public class UnableToDownloadImageException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToDownloadImageException() {
        super("Unable to download image");
    }
}
