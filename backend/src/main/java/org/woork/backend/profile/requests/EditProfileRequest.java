package org.woork.backend.profile.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditProfileRequest {
    @NotNull(message = "Proporciona una descripción.")
    @Size(max = 400, message = "Límite de caracteres excedido.")
    private String about;

    public EditProfileRequest(String about) {
        this.about = about;
    }
}
