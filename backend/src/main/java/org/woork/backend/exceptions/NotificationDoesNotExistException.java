package org.woork.backend.exceptions;

public class NotificationDoesNotExistException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public NotificationDoesNotExistException() {
        super("Notification does not exist");
    }

    public NotificationDoesNotExistException(String message) {
        super(message);
    }
}
