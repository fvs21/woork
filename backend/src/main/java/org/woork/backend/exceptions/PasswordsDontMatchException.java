package org.woork.backend.exceptions;

public class PasswordsDontMatchException extends DefaultException {
    private static final String code = "passwords_dont_match";

    public PasswordsDontMatchException() {
        super("Las contraseñas no son iguales.", code);
    }
}
