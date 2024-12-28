package org.woork.backend.exceptions.exceptions;

public class UnableToCreateChatException extends DefaultException {
    private static final String code = "create_chat_failure";

    public UnableToCreateChatException() {
        super("No fue posible crear la conversación", code);
    }

    public UnableToCreateChatException(String message) {
        super(message, code);
    }
}
