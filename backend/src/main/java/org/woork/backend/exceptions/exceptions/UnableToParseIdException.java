package org.woork.backend.exceptions.exceptions;

public class UnableToParseIdException extends DefaultException {
    private static final String code = "cannot_parse_id";

    public UnableToParseIdException() {
        super("No se encontró el recurso que buscas.", code);
    }
}
