package org.woork.backend.user;

import org.woork.backend.location.Location;
import org.woork.backend.posting.Posting;
import org.woork.backend.posting.PostingDTO;
import org.woork.backend.role.Role;

import java.sql.Date;
import java.util.Set;

public class UserDTO {
    private String firstName;
    private String lastName;
    private int countryCode;
    private String phone;
    private String email;
    private Date dateOfBirth;
    private Gender gender;
    private Set<Role> authorities;
    private boolean verified;
    private boolean emailVerified;
    private String pfpUrl;
    private Set<PostingDTO> postings;
    private Location location;

    public UserDTO() {}

    public UserDTO(String firstName, String lastName, int countryCode, String phone, String email,
                   Date dateOfBirth, Gender gender, Set<Role> authorities, boolean verified, boolean emailVerified,
                   String pfpUrl, Set<PostingDTO> postings, Location location) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.countryCode = countryCode;
        this.phone = phone;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.authorities = authorities;
        this.verified = verified;
        this.emailVerified = emailVerified;
        this.pfpUrl = pfpUrl;
        this.postings = postings;
        this.location = location;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(int countryCode) {
        this.countryCode = countryCode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Set<Role> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = authorities;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getPfpUrl() {
        return pfpUrl;
    }

    public void setPfpUrl(String pfpUrl) {
        this.pfpUrl = pfpUrl;
    }

    public Set<PostingDTO> getPostings() {
        return postings;
    }

    public void setPostings(Set<PostingDTO> postings) {
        this.postings = postings;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
