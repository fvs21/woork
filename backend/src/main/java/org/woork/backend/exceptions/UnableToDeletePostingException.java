package org.woork.backend.exceptions;

public class UnableToDeletePostingException extends DefaultException {
    private static final String code = "posting_deletion_failure";

    public UnableToDeletePostingException(String message) {
        super(message, code);
    }
}
