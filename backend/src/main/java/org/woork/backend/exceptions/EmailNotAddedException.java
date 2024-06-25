package org.woork.backend.exceptions;

public class EmailNotAddedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public EmailNotAddedException() {
        super("Email not added");
    }
}
