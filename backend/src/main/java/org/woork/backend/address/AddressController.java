package org.woork.backend.address;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.address.requests.SearchLocationRequest;
import org.woork.backend.exceptions.exceptions.UnableToParseLocationException;
import org.woork.backend.posting.resources.FetchedLocationResource;
import org.woork.backend.url.UrlService;

import java.util.List;

@RestController
@RequestMapping("api/address")
public class AddressController {
    private final AddressService addressService;
    private final UrlService urlService;

    @Autowired
    public AddressController(AddressService addressService, UrlService urlService) {
        this.addressService = addressService;
        this.urlService = urlService;
    }

    @PostMapping("/search")
    public List<FetchedLocationResource> searchLocation(@RequestBody SearchLocationRequest request) {
        String query = request.getQuery();
        return addressService.searchLocation(query);
    }

    @PostMapping("/getid")
    public String convertCoordsToId(@RequestBody LocationQuery request) {
        if(!List.of(2L,5L,10L,15L,20L,30L,50L).contains(request.radius())) {
            throw new UnableToParseLocationException();
        }
        return urlService.encodeCoordinates(request);
    }
}
