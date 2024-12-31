package org.woork.backend.exceptions.exceptions;

public class PostingDoesNotExistException extends DefaultException {
    private static final String code = "posting_does_not_exist";

    public PostingDoesNotExistException() {
        super("La publicación que buscas no se encuentra.", code);
    }
}
