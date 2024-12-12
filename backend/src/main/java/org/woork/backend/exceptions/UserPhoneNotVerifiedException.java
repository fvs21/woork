package org.woork.backend.exceptions;

public class UserPhoneNotVerifiedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UserPhoneNotVerifiedException() {
        super("User is not verified");
    }
}
