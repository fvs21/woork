package org.woork.backend.address.requests;

import jakarta.validation.constraints.NotBlank;
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
    private String zip_code;

    @NotBlank(message = defaultErrorMessage)
    private String street;

    @NotBlank(message = defaultErrorMessage)
    private int number;

    public UpdateAddressRequest(String city, String country, String state, String zip_code, String street, int number) {
        this.city = city;
        this.country = country;
        this.state = state;
        this.zip_code = zip_code;
        this.street = street;
        this.number = number;
    }
}
