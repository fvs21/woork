package org.woork.backend.notification.records.notifications;

public record NewMessageNotification(
        String senderName,
        String senderProfileUrl,
        Long chatId
) {
}
