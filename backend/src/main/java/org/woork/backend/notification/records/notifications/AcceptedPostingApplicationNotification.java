package org.woork.backend.notification.records.notifications;

public record AcceptedPostingApplicationNotification(
        String creatorName,
        String creatorProfileUrl,
        String postingTitle,
        String postingUrl,
        Long pendingJobId
) {
}
