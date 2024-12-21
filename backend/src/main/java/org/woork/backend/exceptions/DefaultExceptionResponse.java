package org.woork.backend.exceptions;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DefaultExceptionResponse {
    private final boolean error = true;
    private Object message;
    private String code;

    public DefaultExceptionResponse(String message) {
        this.message = message;
    }

    public DefaultExceptionResponse(String message, String code) {
        this.message = message;
        this.code = code;
    }

    public DefaultExceptionResponse(List<String> messages) {
        this.message = messages;
    }
}
