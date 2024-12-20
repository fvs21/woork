package org.woork.backend.explore.responses;

import org.woork.backend.posting.resources.PostingResource;

import java.util.List;

public record ExploreResponse(
        List<PostingResource> postings,
        String category_tag,
        FilteredLocationData search_location
) {
}
