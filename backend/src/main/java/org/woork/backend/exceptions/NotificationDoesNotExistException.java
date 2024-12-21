package org.woork.backend.exceptions;

public class NotificationDoesNotExistException extends DefaultException {
    private static final String code = "notification_not_found";

    public NotificationDoesNotExistException() {
        super("Notification does not exist", code);
    }

    public NotificationDoesNotExistException(String message) {
        super(message, code);
    }
}
