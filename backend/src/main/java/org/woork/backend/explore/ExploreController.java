package org.woork.backend.explore;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.explore.responses.ExploreResponse;
import org.woork.backend.posting.Categories;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("api/explore")
public class ExploreController {
    private static final Log log = LogFactory.getLog(ExploreController.class);
    private final ExploreService exploreService;

    @Autowired
    public ExploreController(ExploreService exploreService) {
        this.exploreService = exploreService;
    }

    @GetMapping
    public ExploreResponse index(@RequestParam("category_tag") Optional<String> category_tag) {
        String category = category_tag.orElse(Categories.JARDINERIA.toString());
        return exploreService.listPostingsDefault(category);
    }

    @GetMapping("/{loc}")
    public ExploreResponse filterByLocation(
            @PathVariable String loc,
            @RequestParam("category_tag") Optional<String> category_tag
    ) {
        String category = category_tag.orElse(Categories.JARDINERIA.toString());
        return exploreService.filterPostingsByLocation(loc, category);
    }
}
