package org.woork.backend.address;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddressResource {
    private Long id;
    private String city;
    private String country;
    private String state;
    private String zip_code;
    private String street;
    private int number;
    private String address_name;
    private Double latitude;
    private Double longitude;

    public AddressResource() {}

    public AddressResource(Address address) {
        this.id = address.getId();
        this.city = address.getCity();
        this.country = address.getCountry();
        this.state = address.getState();
        this.zip_code = address.getZipCode();
        this.street = address.getStreet();
        this.number = address.getNumber();
        this.address_name = address.getAddress_name();
        this.latitude = address.getLatitude();
        this.longitude = address.getLongitude();
    }
}
