package org.woork.backend.explore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
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

import java.util.ArrayList;
import java.util.List;

@Service
public class ExploreService {
    private final AddressService addressService;
    private final PostingService postingService;
    private final UrlService urlService;
    private final UserService userService;
    private final PostingRepository postingRepository;
    private final AuthenticationService authenticationService;

    @Autowired
    public ExploreService(
            AddressService addressService,
            PostingService postingService,
            UrlService urlService,
            UserService userService,
            PostingRepository postingRepository,
            AuthenticationService authenticationService
    ) {
        this.addressService = addressService;
        this.postingService = postingService;
        this.urlService = urlService;
        this.userService = userService;
        this.postingRepository = postingRepository;
        this.authenticationService = authenticationService;
    }

    public ExploreResponse listPostingsDefault(String category) {
        if(category != null) {
            if (!Categories.getCodes().contains(category)) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Category not found"
                );
            }
        } else {
            category = Categories.JARDINERIA.toString();
        }
        if (authenticationService.isUserAuthenticated()) {
            User user = authenticationService.getCurrentUser();
            Address userAddress = user.getAddress();

            if (userAddress != null) {
                List<PostingResource> postings = postingService.filterPostingsByLocationAndCategory(
                        new LocationQuery(
                                userAddress.getLatitude(),
                                userAddress.getLongitude(),
                                2L
                        ),
                        category
                );

                return new ExploreResponse(
                        postings,
                        category,
                        addressService.getUsersLocation(user)
                );
            }
        }

        List<Posting> postings = postingRepository
                .findAllByCategory(category)
                .orElse(new ArrayList<>());

        List<PostingResource> resources = postings.stream().map(posting -> new PostingResource(
                posting,
                urlService.encodeIdToUrl(posting.getId())
        )).toList();

        return new ExploreResponse(
                resources,
                category,
                null
        );
    }

    public LocationFilteredExploreResponse filterPostingsByLocation(String locHash, String category) {
        LocationQuery location = urlService.decodeCoordinates(locHash);

        if(!List.of(2,5,10,15,20,30,50).contains(location.radius().intValue())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid location coordinates");
        }

        if(category != null) {
            if (!Categories.getCodes().contains(category)) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Category not found"
                );
            }
        } else {
            category = Categories.JARDINERIA.toString();
        }

        List<PostingResource> filtered = postingService.filterPostingsByLocationAndCategory(location, category);

        return new LocationFilteredExploreResponse(
                filtered,
                category,
                location,
                locHash
        );
    }
}
