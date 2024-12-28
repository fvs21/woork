package org.woork.backend.exceptions.exceptions;

public class ImageNotFoundException extends DefaultException {
    private static final String code = "image_not_found";

    public ImageNotFoundException() {
        super("La imagen que buscas no fue encontrada.", code);
    }
}
