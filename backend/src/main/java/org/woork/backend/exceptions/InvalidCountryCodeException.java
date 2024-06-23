package org.woork.backend.exceptions;

public class InvalidCountryCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidCountryCodeException() {
        super("Invalid country code");
    }
}
