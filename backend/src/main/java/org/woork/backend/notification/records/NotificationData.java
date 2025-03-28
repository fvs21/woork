package org.woork.backend.notification.records;

import org.woork.backend.notification.models.NotificationType;
import org.woork.backend.user.User;

import java.util.List;

public record NotificationData(
        NotificationType notificationType,
        List<User> receivers,
        Object entity,
        Long entityId
) {
}
