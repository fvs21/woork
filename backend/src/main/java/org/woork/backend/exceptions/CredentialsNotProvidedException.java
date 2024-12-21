package org.woork.backend.exceptions;

public class CredentialsNotProvidedException extends DefaultException {
    private static final String code = "credentials_missing";

    public CredentialsNotProvidedException() {
        super("Credentials were not provided" , code);
    }
}
