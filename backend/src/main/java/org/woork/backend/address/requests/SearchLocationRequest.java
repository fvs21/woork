package org.woork.backend.address.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchLocationRequest {
    private String query;

    public SearchLocationRequest(String query) {
        this.query = query;
    }
}
