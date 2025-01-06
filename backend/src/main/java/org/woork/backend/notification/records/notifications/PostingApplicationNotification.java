package org.woork.backend.notification.records.notifications;

public record PostingApplicationNotification(
        String applicantName,
        String applicantProfileUrl,
        String postingName,
        String postingLink
) {
}
