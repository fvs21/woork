package org.woork.backend.exceptions;

public class IncorrectCredentialsException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public IncorrectCredentialsException() {
        super("La contraseña que colocaste no es correcta.");
    }
}
