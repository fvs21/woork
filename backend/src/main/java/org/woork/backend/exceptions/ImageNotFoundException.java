package org.woork.backend.exceptions;

public class ImageNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ImageNotFoundException() {
        super("The image you are looking for could not be found.");
    }
}
