package org.woork.backend.exceptions;

public class UnableToCreatePostingException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToCreatePostingException() {
        super("Unable to create job posting");
    }

    public UnableToCreatePostingException(String message) {
        super(message);
    }
}
