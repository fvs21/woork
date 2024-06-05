package org.woork.backend.exceptions;

public class VerificationCodeExpiredException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public VerificationCodeExpiredException() {
        super("Verification code expired");
    }
}
