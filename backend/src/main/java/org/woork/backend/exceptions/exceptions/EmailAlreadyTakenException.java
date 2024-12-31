package org.woork.backend.exceptions.exceptions;

public class EmailAlreadyTakenException extends DefaultException {
    private static final String code = "email_already_taken";

    public EmailAlreadyTakenException() {
        super("El correo electrónico que proporcionaste ya existe", code);
    }
}
