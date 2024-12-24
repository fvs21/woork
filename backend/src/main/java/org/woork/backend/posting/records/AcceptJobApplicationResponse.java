package org.woork.backend.posting.records;

import org.woork.backend.pendingjob.resources.HostPendingJobResource;

public record AcceptJobApplicationResponse(
        HostPendingJobResource jobSession,
        Long jobSessionCount
) {
}
