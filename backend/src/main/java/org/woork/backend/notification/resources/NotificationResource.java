package org.woork.backend.notification.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.notification.models.Notification;

import java.time.LocalDate;

@Getter
@Setter
public class NotificationResource {
    private String message;
    private boolean read;
    private Long id;
    private LocalDate createdAt;

    public NotificationResource(Notification notification) {
        this.message = null;
        this.read = notification.isHasRead();
        this.id = notification.getId();
        this.createdAt = notification.getCreatedAt();
    }
}
