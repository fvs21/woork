package org.woork.backend.exceptions.exceptions;

public class UnableToGenerateVerificationCodeException extends DefaultException {
    private static final String code = "unable_to_generate_verification_code";

    public UnableToGenerateVerificationCodeException() {
        super("Ocurrió un error al generar el código de verificación.", code);
    }

    public UnableToGenerateVerificationCodeException(String message) {
        super(message, code);
    }
}
