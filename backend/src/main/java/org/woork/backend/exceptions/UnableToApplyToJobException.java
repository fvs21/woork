package org.woork.backend.exceptions;

public class UnableToApplyToJobException extends DefaultException {
    private static final String code = "posting_application_failure";

    public UnableToApplyToJobException(String message) {
        super(message, code);
    }
}
