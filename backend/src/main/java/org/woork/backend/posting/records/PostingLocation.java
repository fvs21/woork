package org.woork.backend.posting.records;

import jakarta.validation.constraints.Digits;

import java.math.BigDecimal;

public record PostingLocation(
        Long id,
        String address_name,
        String country,
        String state,
        String city,
        String street,
        String zip_code,
        int number,
        @Digits(integer = 2, fraction = 15, message = "Formato de latitud incorrecto.") BigDecimal latitude,
        @Digits(integer = 3, fraction = 15, message = "Formato de longitud incorrecto.") BigDecimal longitude
    ) {}
