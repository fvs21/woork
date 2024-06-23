package org.woork.backend.exceptions;

public class CredentialsNotProvidedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public CredentialsNotProvidedException(String message) {
        super("Credentials were not provided: " + message);
    }
}
