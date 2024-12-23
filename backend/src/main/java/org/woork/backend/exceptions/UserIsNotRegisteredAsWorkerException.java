package org.woork.backend.exceptions;

public class UserIsNotRegisteredAsWorkerException extends DefaultException {
    private static final String code = "worker_not_registered";

    public UserIsNotRegisteredAsWorkerException() {
        super("El usuario no está registrado como trabajador", code);
    }
}
