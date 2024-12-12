package org.woork.backend.posting.resources;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FetchedLocation {
    private String display_name;
    private Double lat;
    private Double lon;
    private String name;

    public FetchedLocation(String display_name, Double lat, Double lon, String name) {
        this.display_name = display_name;
        this.lat = lat;
        this.lon = lon;
        this.name = name;
    }

    public FetchedLocation() {}
}
