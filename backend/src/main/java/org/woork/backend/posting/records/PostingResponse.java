package org.woork.backend.posting.records;

import org.woork.backend.posting.resources.PostingResource;
import org.woork.backend.postingapplication.Status;

public record PostingResponse(
        PostingResource data,
        String postingApplicationStatus
) {
}
