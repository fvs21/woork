package org.woork.backend.authentication.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.woork.backend.annotations.AgeLimit;

public class RegistrationRequest {

    @NotBlank(message = "First name cannot be null")
    private String firstName;

    @NotBlank(message = "Last name cannot be null")
    private String lastName;

    private int countryCode;

    @NotBlank(message = "Phone number cannot be null")
    @Size(min = 10, max = 10, message = "Invalid phone number length")
    private String phone;

    @NotBlank
    @AgeLimit(message = "Must be at least 18 years old to register.")
    private String dateOfBirth;

    @Size(min = 8, max = 16, message = "Password must be at least 8 characters long and maximum 16 characters long")
    private String password;

    public RegistrationRequest() {
        super();
    }

    public RegistrationRequest(String firstName, String lastName, int countryCode, String phone, String dateOfBirth, String password) {
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

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public int getCountryCode() {
        return countryCode;
    }

    public String getPhone() {
        return phone;
    }
}
