package org.woork.backend.exceptions.exceptions;

public class RegistrationException extends DefaultException {
    private static final String code = "invalid_registration";

    public RegistrationException(String type) {
        super("Registration error: " + type, code);
    }
}
