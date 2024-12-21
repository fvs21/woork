package org.woork.backend.exceptions;

public class UnableToUploadImageException extends DefaultException {
    private static final String code = "image_upload_failure";

    public UnableToUploadImageException() {
        super("Ocurrió un error al subir la imagen.", code);
    }
}
