package org.woork.backend.exceptions;

public class IncorrectVerificationCodeException extends DefaultException {
    private static final String code = "incorrect_verification_code";

    public IncorrectVerificationCodeException() {
        super("Código de verificación incorrecto.", code);
    }
}
