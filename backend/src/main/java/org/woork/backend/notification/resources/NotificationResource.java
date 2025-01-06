package org.woork.backend.notification.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.notification.models.Notification;
import org.woork.backend.notification.models.NotificationType;

import java.time.LocalDate;

@Getter
@Setter
public class NotificationResource {
    private Object payload;
    private boolean read;
    private Long id;
    private LocalDate createdAt;
    private NotificationType type;

    public NotificationResource(Notification notification, Object payload) {
        this.payload = payload;
        this.read = notification.isHasRead();
        this.id = notification.getId();
        this.createdAt = notification.getCreatedAt();
        this.type = notification.getNotificationObject().getEntity_type();
    }
}
