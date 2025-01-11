package org.woork.backend.user.resources;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.address.AddressResource;
import org.woork.backend.user.User;

import java.time.LocalDate;

@Getter
@Setter
public class UserResource {
    private String firstName;
    private String lastName;
    private int countryCode;
    private String phone;
    private String email;
    private LocalDate dateOfBirth;
    private String gender;
    private boolean phoneVerified;
    private boolean emailVerified;
    private String pfp_url;
    private AddressResource address;
    private String username;

    private boolean hasIdentityVerified;

    @JsonProperty(value = "is_worker")
    private boolean isWorker;

    public UserResource(User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.countryCode = user.getCountryCode();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.dateOfBirth = user.getDateOfBirth();
        this.gender = user.getGender();
        this.phoneVerified = user.hasPhoneVerified();
        this.emailVerified = user.hasEmailVerified();
        this.pfp_url = user.getProfilePictureUrl();
        this.address = user.getAddress() != null ? new AddressResource(user.getAddress()) : null;
        this.isWorker = user.isWorker();
        this.username = user.getUsername();
        this.hasIdentityVerified = user.hasIdentityVerified();
    }
}
