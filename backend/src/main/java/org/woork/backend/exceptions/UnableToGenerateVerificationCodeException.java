package org.woork.backend.exceptions;

public class UnableToGenerateVerificationCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToGenerateVerificationCodeException() {
        super("Unable to generate verification code");
    }

    public UnableToGenerateVerificationCodeException(String message) {
        super("Unable to generate verification code: " + message);
    }
}
