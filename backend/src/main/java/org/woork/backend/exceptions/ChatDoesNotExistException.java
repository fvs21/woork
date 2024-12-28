package org.woork.backend.exceptions;

public class ChatDoesNotExistException extends DefaultException {
    private static final String code = "chat_not_found";

    public ChatDoesNotExistException() {
        super("El chat que buscas no existe", code);
    }
}
