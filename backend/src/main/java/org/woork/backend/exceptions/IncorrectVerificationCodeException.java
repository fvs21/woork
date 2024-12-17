package org.woork.backend.exceptions;

public class IncorrectVerificationCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public IncorrectVerificationCodeException() {
        super("Código de verificación incorrecto.");
    }
}
