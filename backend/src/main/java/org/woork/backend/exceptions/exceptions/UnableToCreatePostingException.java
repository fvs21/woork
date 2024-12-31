package org.woork.backend.exceptions.exceptions;

public class UnableToCreatePostingException extends DefaultException {
    private static final String code = "create_posting_failure";

    public UnableToCreatePostingException() {
        super("Unable to create job posting", code);
    }

    public UnableToCreatePostingException(String message) {
        super(message, code);
    }
}
