package org.woork.backend.user.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateGenderRequest {
    private String gender;
    private boolean custom;
    private String other;

    public UpdateGenderRequest(String gender, boolean custom, String other) {
        this.gender = gender;
        this.custom = custom;
        this.other = other;
    }
}
