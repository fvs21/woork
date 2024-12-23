package org.woork.backend.posting.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.woork.backend.annotations.validators.InEnum;
import org.woork.backend.posting.Categories;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostingRequest {
    @NotBlank(message = "Es requisito colocar un título.")
    private String title;

    @NotBlank(message = "Es requisito colocar una descripción.")
    private String description;

    @Column(scale = 2, precision = 5)
    @Digits(integer = 5, fraction = 2, message = "Formato de moneda incorrecto.")
    @NotNull(message = "Es requisito elegir un precio.")
    private BigDecimal price;

    private PostingLocationRequest location;

    @NotEmpty(message = "Es requisito elegir una categoría.")
    @InEnum(enumClass = Categories.class, message = "Categoría invalida.")
    private String category;
}
