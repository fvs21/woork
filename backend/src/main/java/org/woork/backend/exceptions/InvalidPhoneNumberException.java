package org.woork.backend.exceptions;

public class InvalidPhoneNumberException extends DefaultException {
    private static final String code = "invalid_phone_number";

    public InvalidPhoneNumberException() {
        super("Número de telefono invalido.", code);
    }
}
