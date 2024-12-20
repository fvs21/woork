package org.woork.backend.explore.responses;

public record FilteredLocationData(
        Double latitude,
        Double longitude,
        Long radius,
        String name,
        String locationId
) {
}
