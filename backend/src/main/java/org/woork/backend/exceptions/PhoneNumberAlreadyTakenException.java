package org.woork.backend.exceptions;

public class PhoneNumberAlreadyTakenException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public PhoneNumberAlreadyTakenException() {
        super("Phone number is already taken");
    }
}
