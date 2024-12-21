package org.woork.backend.exceptions;

import lombok.Getter;
import lombok.Setter;

public class UserDoesNotExistException extends DefaultException {
    private static final String code = "user_does_not_exist";

    public UserDoesNotExistException() {
        super("El usuario no existe", code);
    }
}
