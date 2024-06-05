package org.woork.backend.exceptions;

public class UserNotVerifiedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UserNotVerifiedException() {
        super("User is not verified");
    }
}
