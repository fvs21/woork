package org.woork.backend.exceptions;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DefaultExceptionResponse {
    private final boolean error = true;
    private Object message;

    public DefaultExceptionResponse(String message) {
        this.message = message;
    }

    public DefaultExceptionResponse(List<String> messages) {
        this.message = messages;
    }
}
