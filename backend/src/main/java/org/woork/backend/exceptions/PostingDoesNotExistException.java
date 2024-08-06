package org.woork.backend.exceptions;

public class PostingDoesNotExistException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public PostingDoesNotExistException() {
        super("Posting does not exist");
    }
}
