package org.woork.backend.explore;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.woork.backend.address.Address;
import org.woork.backend.address.AddressService;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.explore.responses.ExploreResponse;
import org.woork.backend.explore.responses.LocationFilteredExploreResponse;
import org.woork.backend.posting.Categories;
import org.woork.backend.posting.Posting;
import org.woork.backend.posting.PostingRepository;
import org.woork.backend.posting.PostingService;
import org.woork.backend.posting.resources.PostingResource;
import org.woork.backend.url.UrlService;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/explore")
public class ExploreController {
    private static final Log log = LogFactory.getLog(ExploreController.class);
    private final ExploreService exploreService;

    @Autowired
    public ExploreController(ExploreService exploreService) {
        this.exploreService = exploreService;
    }


    @GetMapping()
    public ExploreResponse index(@RequestParam("category") Optional<String> category_tag) {
        String category = category_tag.orElse(null);
        return exploreService.listPostingsDefault(category);
    }

    @GetMapping("/{loc}")
    public LocationFilteredExploreResponse filterByLocation(
            @PathVariable String loc,
            @RequestParam("category") Optional<String> category_tag
    ) {
        String category = category_tag.orElse(null);
        return exploreService.filterPostingsByLocation(loc, category);
    }
}
