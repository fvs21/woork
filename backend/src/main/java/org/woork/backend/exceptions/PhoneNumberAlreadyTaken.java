package org.woork.backend.exceptions;

public class PhoneNumberAlreadyTaken extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public PhoneNumberAlreadyTaken() {
        super("Phone number is already taken");
    }
}
