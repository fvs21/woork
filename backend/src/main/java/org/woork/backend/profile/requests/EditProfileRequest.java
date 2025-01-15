package org.woork.backend.profile.requests;

import jakarta.annotation.Nullable;
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
    @Size(max = 400, message = "Límite de caracteres excedido.")
    private String about;

    private Set<String> categories;

    public EditProfileRequest(String about, Set<String> categories) {
        this.about = about;
        this.categories = categories;
    }
}
