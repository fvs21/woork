package org.woork.backend.explore.responses;

import org.woork.backend.address.records.UserLocation;
import org.woork.backend.posting.resources.PostingResource;

import java.util.List;

public record ExploreResponse(
        List<PostingResource> postings,
        String category_tag,
        UserLocation search_location
) {
}
