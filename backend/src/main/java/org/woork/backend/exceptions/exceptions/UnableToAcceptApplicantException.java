package org.woork.backend.exceptions.exceptions;

public class UnableToAcceptApplicantException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public UnableToAcceptApplicantException(String message) {
        super(message);
    }
}
