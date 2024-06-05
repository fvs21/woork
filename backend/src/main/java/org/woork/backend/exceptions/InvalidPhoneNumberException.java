package org.woork.backend.exceptions;

public class InvalidPhoneNumberException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidPhoneNumberException() {
        super("Invalid phone number");
    }
}
