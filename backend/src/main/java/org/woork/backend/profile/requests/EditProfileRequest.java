package org.woork.backend.profile.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.posting.Categories;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class EditProfileRequest {
    @NotNull(message = "Proporciona una descripción.")
    @Size(max = 400, message = "Límite de caracteres excedido.")
    private String about;

    private Set<Categories> categories;

    public EditProfileRequest(String about, Set<Categories> categories) {
        this.about = about;
        this.categories = categories;
    }
}
