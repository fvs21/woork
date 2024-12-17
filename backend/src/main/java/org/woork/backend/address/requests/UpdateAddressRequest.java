package org.woork.backend.address.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class UpdateAddressRequest {
    private final String defaultErrorMessage = "Error al crear ubicación";

    @NotBlank(message = defaultErrorMessage)
    private String city;

    @NotBlank(message = defaultErrorMessage)
    private String country;

    @NotBlank(message = defaultErrorMessage)
    private String state;

    @NotBlank(message = defaultErrorMessage)
    private String zipCode;

    @NotBlank(message = defaultErrorMessage)
    private String street;

    @NotNull(message = defaultErrorMessage)
    private int number;

    @NotBlank(message = defaultErrorMessage)
    private String address_name;

    public UpdateAddressRequest(String city, String country, String state, String zipCode, String street, int number, String address_name) {
        this.city = city;
        this.country = country;
        this.state = state;
        this.zipCode = zipCode;
        this.street = street;
        this.number = number;
        this.address_name = address_name;
    }
}
