package org.woork.backend.exceptions;

public class UnableToDeletePostingException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToDeletePostingException(String message) {
        super(message);
    }
}
