package org.woork.backend.location;

public class LocationDTO {
    private String city;
    private String country;
    private String state;
    private String zip_code;
    private String street;
    private int number;

    public LocationDTO() {}

    public LocationDTO(String city, String country, String state, String zip_code, String street, int number) {
        this.city = city;
        this.country = country;
        this.state = state;
        this.zip_code = zip_code;
        this.street = street;
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
