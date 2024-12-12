package org.woork.backend.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Address {
    @Id
    @SequenceGenerator(
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "address_sequence"
    )
    @Column(name = "address_id")
    @JsonIgnore
    private Long id;

    private String address_name;

    private String city;
    private String country;
    private String state;
    private String street;

    @Column(name = "zip_code")
    private String zipCode;

    private int number;

    private Double latitude;

    private Double longitude;

    private Double display_lat;

    private Double display_long;

    public Address() {}

    public Address(
            String city,
            String country,
            String state,
            String street,
            String zipCode,
            int number,
            double latitude,
            double longitude,
            String address_name
    ) {
        this.city = city;
        this.country = country;
        this.state = state;
        this.street = street;
        this.zipCode = zipCode;
        this.number = number;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address_name = address_name;
    }

    public void updateCoords(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public void updateDisplayCoords(Double latitude, Double longitude) {
        this.display_lat = latitude;
        this.display_long = longitude;
    }
}
