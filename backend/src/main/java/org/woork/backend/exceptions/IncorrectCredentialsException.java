package org.woork.backend.exceptions;

import org.woork.backend.exceptions.DefaultException;

public class IncorrectCredentialsException extends DefaultException {
    private static final String code = "login_failure";

    public IncorrectCredentialsException() {
        super("La contraseña que colocaste no es correcta.", code);
    }
}
