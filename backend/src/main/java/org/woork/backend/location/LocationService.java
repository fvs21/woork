package org.woork.backend.location;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.InvalidLocationException;
import org.woork.backend.utils.JsonUtils;

import java.util.List;
import java.util.Set;

@Service
public class LocationService {
    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
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

    public LocationDTO toDTO(Location location) {
        LocationDTO locationDTO = new LocationDTO();

        locationDTO.setNumber(location.getNumber());
        locationDTO.setStreet(location.getStreet());
        locationDTO.setCity(location.getCity());
        locationDTO.setState(location.getState());
        locationDTO.setCountry(location.getCountry());
        locationDTO.setZip_code(location.getZipCode());
        return locationDTO;
    }

    public Location createLocation(LocationDTO locationDTO) {
        Location location = new Location();

        String country = locationDTO.getCountry();
        String state = locationDTO.getState();
        String city = locationDTO.getCity();

        if(!validateCountryStateAndCity(country, state, city)) {
            throw new InvalidLocationException();
        }

        location.setCountry(locationDTO.getCountry());
        location.setCity(locationDTO.getCity());
        location.setState(locationDTO.getState());
        location.setStreet(locationDTO.getStreet());
        location.setZipCode(locationDTO.getZip_code());
        location.setNumber(locationDTO.getNumber());
        return locationRepository.save(location);
    }

    public Location updateLocation(Long locationId, LocationDTO locationDTO) {
        Location location = locationRepository.findById(locationId).orElse(new Location());
        String country = locationDTO.getCountry();
        String state = locationDTO.getState();
        String city = locationDTO.getCity();

        if(!validateCountryStateAndCity(country, state, city)) {
            throw new InvalidLocationException();
        }
        location.setCountry(country);
        location.setCity(city);
        location.setState(state);
        location.setStreet(locationDTO.getStreet());
        location.setNumber(locationDTO.getNumber());
        location.setZipCode(locationDTO.getZip_code());
        return locationRepository.save(location);
    }

    public LocationDTO getLocation(Long id) {
        Location location = locationRepository.findById(id).orElseThrow(null);

        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setCountry(location.getCountry());
        locationDTO.setCity(location.getCity());
        locationDTO.setState(location.getState());
        locationDTO.setStreet(location.getStreet());
        locationDTO.setZip_code(location.getZipCode());
        locationDTO.setNumber(location.getNumber());

        return locationDTO;
    }

    public List<Location> getLocationsByState(String country, String state) {
        return locationRepository.findAllByCountryAndState(country, state);
    }

    public List<Location> getLocationsByCity(String country, String state, String city) {
        return locationRepository.findAllByCountryAndStateAndCity(country, state, city);
    }
}
