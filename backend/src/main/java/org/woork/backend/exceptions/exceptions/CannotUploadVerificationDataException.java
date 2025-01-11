package org.woork.backend.exceptions.exceptions;

public class CannotUploadVerificationDataException extends DefaultException {
    private static final String code = "verification_failed";

    public CannotUploadVerificationDataException(String message) {
        super(message, code);
    }
}
