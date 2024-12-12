package org.woork.backend.address.records;

//record that represents a location query when users filter by location
public record LocationQuery(Double latitude, Double longitude, Long radius) {}
