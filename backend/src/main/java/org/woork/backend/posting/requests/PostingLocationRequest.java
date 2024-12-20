package org.woork.backend.posting.requests;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import org.woork.backend.posting.records.PostingLocation;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostingLocationRequest {
    @NotNull(message = "Error al procesar ubicación")
    private boolean create;

    private PostingLocation location;
}
