package org.woork.backend.exceptions.exceptions;

public class UserPhoneNotVerifiedException extends DefaultException {
    private static final String code = "user_not_verified";

    public UserPhoneNotVerifiedException() {
        super("User is not verified", code);
    }
}
