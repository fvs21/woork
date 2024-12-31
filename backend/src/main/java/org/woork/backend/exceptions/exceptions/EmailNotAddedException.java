package org.woork.backend.exceptions.exceptions;

public class EmailNotAddedException extends DefaultException {
    private static final String code = "";

    public EmailNotAddedException() {
        super("Something went wrong", code);
    }
}
