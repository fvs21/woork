package org.woork.backend.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.woork.backend.exceptions.CredentialsNotProvidedException;
import org.woork.backend.exceptions.InvalidCountryCodeException;
import org.woork.backend.exceptions.InvalidPhoneNumberException;
import org.woork.backend.exceptions.RegistrationException;
import org.woork.backend.image.Image;
import org.woork.backend.location.Location;
import org.woork.backend.posting.Posting;
import org.woork.backend.role.Role;
import org.woork.backend.utils.RegistrationUtils;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @JsonIgnore
    @Column(name = "user_id")
    private Long id;

    //Basic information
    private String first_name;
    private String last_name;

    @Column(name = "country_code")
    private int countryCode;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role_junction",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> authorities;

    //Verification

    @Column(name = "verified")
    private boolean verified;

    @Column(name = "phone_verification_code")
    @JsonIgnore
    private String phoneVerificationCode;

    @Column(name = "phone_code_generation_date")
    @JsonIgnore
    private LocalDateTime phoneCodeGenerationDate;


    @Column(name = "email_verified")
    private boolean emailVerified;

    @Column(name = "email_verification_code")
    @JsonIgnore
    private String emailVerificationCode;

    @Column(name = "email_code_generation_date")
    @JsonIgnore
    private LocalDateTime emailCodeGenerationDate;

    //Else

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_picture", referencedColumnName = "image_id")
    private Image profilePicture;

    @OneToMany(mappedBy = "author")
    @JsonIgnore
    private Set<Posting> postings;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "location", referencedColumnName = "location_id")
    private Location location;


    public User() {
        this.authorities = new HashSet<>();
        this.postings = new HashSet<>();
        this.verified = false;
        this.emailVerified = false;
    }

    public User(String first_name, String last_name, int countryCode, String phone, String email, Date dateOfBirth, String password, Set<Role> authorities ) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.countryCode = countryCode;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.verified = false;
        this.emailVerified = false;
        this.dateOfBirth = dateOfBirth;
        this.authorities = authorities;
        this.postings = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(int countryCode) {
        Set<Integer> set = new HashSet<>(List.of(52));
        if(!set.contains(countryCode)) {
            throw new InvalidCountryCodeException();
        }
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

    public void setDateOfBirth(String dateOfBirth) {
        if(!RegistrationUtils.verifyAge(dateOfBirth)) {
            throw new RegistrationException("User must be over the age of 18");
        }
        this.dateOfBirth = Date.valueOf(dateOfBirth);
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

    public String getPhoneVerificationCode() {
        return phoneVerificationCode;
    }

    public void setPhoneVerificationCode(String phoneVerificationCode) {
        this.phoneVerificationCode = phoneVerificationCode;
        setPhoneCodeGenerationDate(LocalDateTime.now());
    }

    public LocalDateTime getPhoneCodeGenerationDate() {
        return phoneCodeGenerationDate;
    }

    public void setPhoneCodeGenerationDate(LocalDateTime phoneCodeGenerationDate) {
        this.phoneCodeGenerationDate = phoneCodeGenerationDate;
    }

    //Method to check if code is still valid. A code expires 90 seconds after its creation.
    @JsonIgnore
    public boolean isPhoneVerificationCodeValid() {
        if(getPhoneCodeGenerationDate() == null) {
            return false;
        }
        long seconds = ChronoUnit.SECONDS.between(getPhoneCodeGenerationDate(), LocalDateTime.now());
        return seconds <= 90;
    }

    //Method to check if 20 seconds have passed since last code generation request.
    public boolean requestPhoneCodeRefreshTime() {
        if(getPhoneCodeGenerationDate() == null) {
            return true;
        }
        long seconds = ChronoUnit.SECONDS.between(getPhoneCodeGenerationDate(), LocalDateTime.now());
        return seconds >= 20;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getEmailVerificationCode() {
        return emailVerificationCode;
    }

    public void setEmailVerificationCode(String emailVerificationCode) {
        this.emailVerificationCode = emailVerificationCode;
        setEmailCodeGenerationDate(LocalDateTime.now());
    }

    public LocalDateTime getEmailCodeGenerationDate() {
        return emailCodeGenerationDate;
    }

    public void setEmailCodeGenerationDate(LocalDateTime emailCodeGenerationDate) {
        this.emailCodeGenerationDate = emailCodeGenerationDate;
    }

    @JsonIgnore
    public boolean isEmailVerificationCodeValid() {
        if(getEmailCodeGenerationDate() == null) {
            return false;
        }
        long seconds = ChronoUnit.SECONDS.between(getEmailCodeGenerationDate(), LocalDateTime.now());
        return seconds <= 90;
    }

    public boolean requestEmailCodeRefreshTime() {
        if(getEmailCodeGenerationDate() == null) {
            return true;
        }
        long seconds = ChronoUnit.SECONDS.between(getEmailCodeGenerationDate(), LocalDateTime.now());
        return seconds >= 20;
    }

    public Set<Posting> getPostings() {
        return postings;
    }

    public void setPostings(Set<Posting> postings) {
        this.postings = postings;
    }

    public Image getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(Image profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
