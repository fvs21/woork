package org.woork.backend.exceptions.exceptions;

public class UnableToDownloadImageException extends DefaultException {
    private static final String code = "image_download_failure";

    public UnableToDownloadImageException() {
        super("Ocurrió un error al descargar la imagen.", code);
    }
}
