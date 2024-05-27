package org.woork.backend.authentication;

import java.sql.Date;

public class RegistrationObject {
    private String firstName;
    private String lastName;
    private int countryCode;
    private String phone;
    private Date dateOfBirth;
    private String password;

    public RegistrationObject() {
        super();
    }

    public RegistrationObject(String firstName, String lastName, int countryCode, String phone, Date dateOfBirth, String password) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.countryCode = countryCode;
        this.phone = phone;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public int getCountryCode() {
        return countryCode;
    }

    public String getPhone() {
        return phone;
    }
}
