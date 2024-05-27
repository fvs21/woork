package org.woork.backend.location;

public class LocationObject {
    private String city;
    private String country;
    private String state;
    private String zip_code;
    private String street;

    public LocationObject(String city, String country, String state, String zip_code, String street) {
        this.city = city;
        this.country = country;
        this.state = state;
        this.zip_code = zip_code;
        this.street = street;
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
}
