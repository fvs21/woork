package org.woork.backend.posting;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Set;

public class Locations {
    @JsonProperty("locations")
    private Set<String> locations;

    public Set<String> getLocations() {
        return locations;
    }
}
