package org.woork.backend.profile.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditProfileRequest {
    @NotNull(message = "Proporciona una descripción.")
    private String about;

    public EditProfileRequest(String about) {
        this.about = about;
    }
}
