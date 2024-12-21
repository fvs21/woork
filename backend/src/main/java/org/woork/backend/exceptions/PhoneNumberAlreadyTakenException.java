package org.woork.backend.exceptions;

public class PhoneNumberAlreadyTakenException extends DefaultException {
    private static final String code = "phone_already_taken";

    public PhoneNumberAlreadyTakenException() {
        super("El número de teléfono que proporcionaste ya está en uso.", code);
    }
}
