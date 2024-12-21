package org.woork.backend.exceptions;

public class UnableToGenerateVerificationCodeException extends DefaultException {
    private static final String code = "unable_to_generate_verification_code";

    public UnableToGenerateVerificationCodeException() {
        super("Unable to generate verification code", code);
    }

    public UnableToGenerateVerificationCodeException(String message) {
        super(message, code);
    }
}
