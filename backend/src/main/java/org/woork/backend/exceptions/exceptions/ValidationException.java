package org.woork.backend.exceptions.exceptions;

import lombok.Getter;

import java.util.List;

@Getter
public class ValidationException extends RuntimeException {
    private List<String> details;

    public ValidationException(String message) {
        super(message);
    }

    public ValidationException(String message, List<String> details) {
        super(message);
        this.details = details;
    }
}
