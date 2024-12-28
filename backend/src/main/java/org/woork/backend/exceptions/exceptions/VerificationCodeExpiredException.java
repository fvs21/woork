package org.woork.backend.exceptions.exceptions;

public class VerificationCodeExpiredException extends DefaultException {
    private static final String code = "verification_code_expired";

    public VerificationCodeExpiredException() {
        super("El código de verificación expiró.", code);
    }
}
