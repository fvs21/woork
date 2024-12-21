package org.woork.backend.exceptions;

public class UnableToParseLocationException extends DefaultException {
    private static final String code = "unable_to_parse_location";

    public UnableToParseLocationException() {
        super("Unable to parse location", code);
    }
}
