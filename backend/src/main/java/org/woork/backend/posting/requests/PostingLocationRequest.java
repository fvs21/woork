package org.woork.backend.posting.requests;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;

@Getter
@Setter
public class PostingLocationRequest {
    @NotNull(message = "Error al procesar ubicación")
    private boolean create;

    private Long id;

    private String address_name;
    private String country;
    private String state;
    private String city;
    private String street;
    private String zipCode;
    private int number;

    @Digits(integer = 2, fraction = 15)
    private BigDecimal latitude;

    @Digits(integer = 3, fraction = 15)
    private BigDecimal longitude;
}
