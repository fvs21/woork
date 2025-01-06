package org.woork.backend.notification.records;

public record PostingApplicationNotification(
        String applicantName,
        String applicantProfileUrl,
        String postingName,
        String postingLink
) {
}
