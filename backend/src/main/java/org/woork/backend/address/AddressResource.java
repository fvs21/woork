package org.woork.backend.address;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddressResource {
    private String city;
    private String country;
    private String state;
    private String zip_code;
    private String street;
    private int number;

    public AddressResource() {}

    public AddressResource(Address address) {
        this.city = address.getCity();
        this.country = address.getCountry();
        this.state = address.getState();
        this.zip_code = address.getZipCode();
        this.street = address.getStreet();
        this.number = address.getNumber();
    }

}
