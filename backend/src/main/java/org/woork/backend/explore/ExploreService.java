package org.woork.backend.explore;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.woork.backend.address.Address;
import org.woork.backend.address.AddressService;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.explore.responses.ExploreResponse;
import org.woork.backend.explore.responses.FilteredLocationData;
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
    private static final Log log = LogFactory.getLog(ExploreService.class);
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
        if (!Categories.getCodes().contains(category)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Category not found"
            );
        }

        if (authenticationService.isUserAuthenticated()) {
            User user = authenticationService.getCurrentUser();
            Address userAddress = user.getAddress();

            if (userAddress != null && (userAddress.getLatitude() != null && userAddress.getLongitude() != null)) {
                LocationQuery query = new LocationQuery(
                        userAddress.getLatitude(),
                        userAddress.getLongitude(),
                        2L
                );

                List<PostingResource> postings = postingService.filterPostingsByLocationAndCategory(
                        query,
                        category
                );

                FilteredLocationData searchLocation = new FilteredLocationData(
                        userAddress.getLatitude(),
                        userAddress.getLongitude(),
                        2L,
                        userAddress.getAddress_name(),
                        null
                );

                return new ExploreResponse(
                        postings,
                        category,
                        searchLocation
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

    public ExploreResponse filterPostingsByLocation(String locHash, String category) {
        LocationQuery location;

        try {
             location = urlService.decodeCoordinates(locHash);
        } catch(Exception e) {
            log.info(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Location not found"
            );
        }

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

        FilteredLocationData searchLocation = new FilteredLocationData(
                location.latitude(),
                location.longitude(),
                location.radius(),
                "Ubicación",
                locHash
        );

        return new ExploreResponse(
                filtered,
                category,
                searchLocation
        );
    }
}
