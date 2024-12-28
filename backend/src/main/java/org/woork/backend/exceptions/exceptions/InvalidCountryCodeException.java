package org.woork.backend.exceptions.exceptions;

public class InvalidCountryCodeException extends DefaultException {
    private static final String code = "invalid_country_code";

    public InvalidCountryCodeException() {
        super("Invalid country code", code);
    }
}
