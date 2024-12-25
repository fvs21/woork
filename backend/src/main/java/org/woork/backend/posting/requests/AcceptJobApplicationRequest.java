package org.woork.backend.posting.requests;

public record AcceptJobApplicationRequest(
        Long applicantId,
        String postingId
) {
}
