package org.woork.backend.posting.resources;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class FetchedLocationResource {
    private String display_name;
    private Double lat;
    private Double lon;
    private String name;

    private Map<String, String> address;

    public FetchedLocationResource(String display_name, Double lat, Double lon, String name, String country, Map<String, String> address) {
        this.display_name = display_name;
        this.lat = lat;
        this.lon = lon;
        this.name = name;
        this.address = address;
    }

    public FetchedLocationResource() {}
}
