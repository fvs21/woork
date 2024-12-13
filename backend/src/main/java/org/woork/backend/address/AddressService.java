package org.woork.backend.address;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.woork.backend.address.records.Coordinates;
import org.woork.backend.address.records.LocationQuery;
import org.woork.backend.address.requests.UpdateAddressRequest;
import org.woork.backend.exceptions.InvalidLocationException;
import org.woork.backend.exceptions.UnableToDeleteAddressException;
import org.woork.backend.exceptions.UnableToFetchSearchLocationException;
import org.woork.backend.posting.Posting;
import org.woork.backend.posting.PostingRepository;
import org.woork.backend.posting.requests.PostingLocationRequest;
import org.woork.backend.posting.resources.FetchedLocationResource;
import org.woork.backend.user.User;
import org.woork.backend.utils.CustomStringUtils;
import org.woork.backend.utils.JsonUtils;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AddressService {
    private static final Log log = LogFactory.getLog(AddressService.class);
    private final AddressRepository locationRepository;
    private final AddressRepository addressRepository;
    private final PostingRepository postingRepository;

    @Autowired
    public AddressService(AddressRepository locationRepository, AddressRepository addressRepository, PostingRepository postingRepository) {
        this.locationRepository = locationRepository;
        this.addressRepository = addressRepository;
        this.postingRepository = postingRepository;
    }

    private boolean validateCountryStateAndCity(String country, String state, String city) {
        Set<?> countries = (Set<?>) JsonUtils.readJson(
                JsonUtils.readFile("countries/countries.json"),
                Set.class
        );
        if (!countries.contains(country)) {
            return false;
        }


        Set<?> states = (Set<?>) JsonUtils.readJson(
                JsonUtils.readFile("countries/" + StringUtils.stripAccents(country) + "/states.json"),
                Set.class
        );

        if (!states.contains(state)) {
            return false;
        }

        //directories do not contain accents, {state}.json files do.
        Set<?> cities = (Set<?>) JsonUtils.readJson(
                JsonUtils.readFile("countries/" + StringUtils.stripAccents(country) + "/" + state + ".json"),
                Set.class
        );

        return cities.contains(city);
    }

    public Address createAddress(UpdateAddressRequest request) {
        Address address = new Address();

        String country = request.getCountry();
        String state = request.getState();
        String city = request.getCity();

        if(!validateCountryStateAndCity(country, state, city)) {
            throw new InvalidLocationException();
        }

        address.setCountry(request.getCountry());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setStreet(request.getStreet());
        address.setZipCode(request.getZip_code());
        address.setNumber(request.getNumber());
        return locationRepository.save(address);
    }

    public Address createAddress(PostingLocationRequest request) {
        Address address = new Address();

        String country = request.getCountry();
        String state = request.getState();
        String city = request.getCity();

        if(!validateCountryStateAndCity(country, state, city)) {
            throw new InvalidLocationException();
        }

        Coordinates displayCoords = createRandomCoordsForDisplay(request.getLatitude().doubleValue(), request.getLongitude().doubleValue());

        address.setCountry(request.getCountry());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setStreet(request.getStreet());
        address.setAddress_name(request.getAddress_name());
        address.setNumber(request.getNumber());
        address.setZipCode(request.getZipCode());
        address.setLatitude(address.getLatitude());
        address.setLongitude(address.getLongitude());
        address.setDisplay_lat(displayCoords.latitude());
        address.setDisplay_long(displayCoords.longitude());
        return locationRepository.save(address);
    }

    public Address updateAddress(Long locationId, UpdateAddressRequest request) {
        Address address = locationRepository.findById(locationId).orElse(new Address());
        String country = request.getCountry();
        String state = request.getState();
        String city = request.getCity();

        if(!validateCountryStateAndCity(country, state, city)) {
            throw new InvalidLocationException();
        }
        address.setCountry(country);
        address.setCity(city);
        address.setState(state);
        address.setStreet(request.getStreet());
        address.setNumber(request.getNumber());
        address.setZipCode(request.getZip_code());
        return locationRepository.save(address);
    }

    public AddressResource getAddress(Long id) {
        Address address = locationRepository.findById(id).orElseThrow(null);
        return new AddressResource(address);
    }

    public Coordinates getUsersLocation(User user) {
        if(user.getAddress() == null)
            return null;

        Address address = user.getAddress();
        if(address.getLatitude() != null && address.getLongitude() != null) {
            return new Coordinates(
                    address.getLatitude(),
                    address.getLongitude()
            );
        }

        return null;
    }

    public boolean deleteAddedAddress(Long id, User user) {
        if(Objects.equals(user.getAddress().getId(), id))
            throw new UnableToDeleteAddressException("You cannot delete your current address");

        Set<Posting> createdPostings = postingRepository.findByAddress_Id(id).orElse(new HashSet<>());
        if(createdPostings.stream().noneMatch(
                posting -> posting.getAddress().getId().equals(id)
        )) {
            throw new UnableToDeleteAddressException("You cannot delete other's person address");
        }

        Address address = locationRepository.findById(id).orElse(null);
        if(address == null)
            throw new UnableToDeleteAddressException("Address does not exist");

        postingRepository.deleteAll(createdPostings);
        locationRepository.delete(address);
        return true;
    }

    private Double randomDecimal(Double min, Double max, int digits) {
        SecureRandom random = new SecureRandom();
        return (random.nextInt((int) (min*Math.pow(10, digits)), (int) (max*Math.pow(10, digits))) / Math.pow(10, digits));
    }

    private Coordinates createRandomCoordsForDisplay(Double lat, Double lon) {
        SecureRandom random = new SecureRandom();

        ArrayList<Coordinates> options = new ArrayList<>();

        List<Double> options_x = List.of(
                randomDecimal(-0.027, -0.009, 8),
                randomDecimal(0.009, 0.027, 8)
        );

        double x1 = options_x.get(random.nextInt(0, 1));
        double y1 = Math.sqrt(
                Math.pow(0.027, 2) - Math.pow(x1, 2)
        );

        Double chosenY1 = randomDecimal(
                -1*y1,
                y1,
                4
        );

        options.add(
                new Coordinates(x1, chosenY1)
        );

        List<Double> options_y = List.of(
                randomDecimal(-0.027, -0.009, 8),
                randomDecimal(0.009, 0.027, 8)
        );

        double y2 = options_y.get(random.nextInt(0, 1));
        double x2 = Math.sqrt(
                Math.pow(0.027, 2) - Math.pow(y2, 2)
        );

        Double chosenX2 = randomDecimal(
                -1*x2,
                x2,
                4
        );

        options.add(
                new Coordinates(chosenX2, y2)
        );

        Coordinates final_ = options.get(random.nextInt(0, 1));

        return new Coordinates(
            lat + final_.latitude(), lon + final_.longitude()
        );
    }

    public void storeCoordinates(Address address, Double lat, Double lon) {
        //display coords
        address.updateCoords(lat, lon);
    }

    public List<Address> filterLocationsByCoords(LocationQuery locationQuery) {
        Double offset = locationQuery.radius() * 0.009; //Where 0.009 is approximately a kilometer. Just a generalization

        Double minLat = locationQuery.latitude() - offset;
        Double maxLat = locationQuery.latitude() + offset;
        Double minLng = locationQuery.longitude() - offset;
        Double maxLng = locationQuery.longitude() + offset;

        Set<Address> addresses = addressRepository.findAllByLatitudeBetweenAndLongitudeBetween(
                minLat, maxLat, minLng, maxLng
        );

        return addresses.stream()
                .filter(address -> Math.sqrt(
                        Math.pow(address.getLatitude() - locationQuery.latitude(), 2) +
                                Math.pow(address.getLongitude() - locationQuery.longitude(), 2)
                ) <= offset)
                .collect(Collectors.toList());
    }

    public List<FetchedLocationResource> searchLocation(String query) {
        String url = "https://nominatim.openstreetmap.org/search?q=" + CustomStringUtils.stripAccents(query) + "&format=json&limit=5&addressdetails=1";
        try {
            String json = getUrl(url);

            ObjectMapper mapper = new ObjectMapper();
            List<FetchedLocationResource> locations = mapper.readValue(
                    json,
                    new TypeReference<List<FetchedLocationResource>>(){}
            );


            return locations.stream()
                    .filter(location -> Objects.equals(location.getAddress().get("country"), "México"))
                    .toList();

        } catch (IOException | InterruptedException e) {
            throw new UnableToFetchSearchLocationException(e.getMessage());
        }
    }

    public String getUrl(String url) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        HttpServletRequest currentRequest = (
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes()
        ).getRequest();

        HttpRequest request = HttpRequest.newBuilder(
                        URI.create(url)
                )
                .GET()
                .header("User-Agent", currentRequest.getHeader("User-Agent"))
                .build();

        return client.send(request, HttpResponse.BodyHandlers.ofString()).body();
    }
}
