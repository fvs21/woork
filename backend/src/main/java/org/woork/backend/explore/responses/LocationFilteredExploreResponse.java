package org.woork.backend.explore.responses;

import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.posting.resources.PostingResource;

import java.util.List;

public record LocationFilteredExploreResponse(
        List<PostingResource> postings,
        String category_tag,
        LocationQuery location_query,
        String locId
) {
}
