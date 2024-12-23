package org.woork.backend.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.woork.backend.image.Image;
import org.woork.backend.address.Address;
import org.woork.backend.posting.Posting;
import org.woork.backend.role.Role;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Getter
    @Setter
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
    @Setter
    @Getter
    private String firstName;

    @Setter
    @Getter
    private String lastName;

    @Setter
    @Getter
    @Column(name = "country_code")
    private int countryCode;

    @Getter
    @Column(name = "phone", unique = true)
    private String phone;

    @Getter
    @Column(name = "email", unique = true)
    private String email;

    @Getter
    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Getter
    @Setter
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Setter
    @Getter
    @Column(name = "gender")
    private String gender;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Setter
    @Column(unique = true)
    private String username;
    //Verification

    @Setter
    @Getter
    @Column(name = "phone_verified_at")
    private LocalDate phoneVerifiedAt;

    @Getter
    @Column(name = "phone_verification_code")
    @JsonIgnore
    private String phoneVerificationCode;

    @Setter
    @Getter
    @Column(name = "phone_code_generation_date")
    @JsonIgnore
    private LocalDateTime phoneCodeGenerationDate;

    @Setter
    @Getter
    @Column(name = "email_verified_at")
    private LocalDate emailVerifiedAt;

    @Getter
    @Column(name = "email_verification_code")
    @JsonIgnore
    private String emailVerificationCode;

    @Setter
    @Getter
    @Column(name = "email_code_generation_date")
    @JsonIgnore
    private LocalDateTime emailCodeGenerationDate;

    //Else

    @Setter
    @Getter
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_picture", referencedColumnName = "image_id")
    private Image profilePicture;

    @Setter
    @Getter
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Posting> postings;

    @Setter
    @Getter
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address", referencedColumnName = "address_id")
    private Address address;

    @Column(name = "is_worker")
    @Setter
    @Getter
    private boolean isWorker;

    @Column(name = "password_updated_at")
    @Setter
    @Getter
    private LocalDateTime passwordUpdatedAt;

    @Column(columnDefinition = "TEXT")
    @Size(min = 1, max = 450)
    @Getter
    @Setter
    private String about;

    @Getter
    @Setter
    @Column(name = "identity_verified_at")
    private LocalDate identityVerifiedAt;

    @Getter
    private LocalDate createdAt;

    public User() {
        this.role = Role.USER;
        this.postings = new ArrayList<>();
        this.isWorker = false;
        this.createdAt = LocalDate.now();
    }

    public User(
            String first_name,
            String last_name,
            int countryCode,
            String phone,
            String email,
            LocalDate dateOfBirth,
            String password,
            Role role
    ) {
        this.firstName = first_name;
        this.lastName = last_name;
        this.countryCode = countryCode;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.role = role;
        this.postings = new ArrayList<>();
        this.isWorker = false;
        this.createdAt = LocalDate.now();
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public void setAuthority(Role role) {
        this.role = role;
    }

    public boolean hasPhoneVerified() {
        return this.phoneVerifiedAt != null;
    }

    public boolean hasEmailVerified() {
        return this.emailVerifiedAt != null;
    }

    public void setPhone(String phone) {
        this.phone = phone;
        this.phoneVerifiedAt = null;
    }

    public void setPhoneVerificationCode(String phoneVerificationCode) {
        this.phoneVerificationCode = phoneVerificationCode;
        setPhoneCodeGenerationDate(LocalDateTime.now());
    }

    //Method to check if code is still valid. A code expires 90 seconds after its creation.
    @JsonIgnore
    public boolean isPhoneVerificationCodeValid() {
        if(getPhoneCodeGenerationDate() == null) {
            return false;
        }
        long seconds = ChronoUnit.MINUTES.between(getPhoneCodeGenerationDate(), LocalDateTime.now());
        return seconds <= 4;
    }

    //Method to check if 20 seconds have passed since last code generation request.
    public boolean canRequestPhoneVerificationCode() {
        if(getPhoneCodeGenerationDate() == null) {
            return true;
        }
        long seconds = ChronoUnit.SECONDS.between(getPhoneCodeGenerationDate(), LocalDateTime.now());
        return seconds >= 30;
    }

    public void setEmail(String email) {
        this.email = email;
        this.emailVerifiedAt = null;
    }

    public void setEmailVerificationCode(String emailVerificationCode) {
        this.emailVerificationCode = emailVerificationCode;
        setEmailCodeGenerationDate(LocalDateTime.now());
    }

    @JsonIgnore
    public boolean isEmailVerificationCodeValid() {
        if(getEmailCodeGenerationDate() == null) {
            return false;
        }
        long seconds = ChronoUnit.SECONDS.between(getEmailCodeGenerationDate(), LocalDateTime.now());
        return seconds <= 90;
    }

    public boolean canRequestEmailVerificationCode() {
        if(getEmailCodeGenerationDate() == null) {
            return true;
        }
        long seconds = ChronoUnit.SECONDS.between(getEmailCodeGenerationDate(), LocalDateTime.now());
        return seconds >= 20;
    }

    public void markPhoneAsVerified() {
        if(this.phoneVerifiedAt != null) {
            return;
        }
        this.phoneVerifiedAt = LocalDate.now();
        this.phoneVerificationCode = null;
        this.phoneCodeGenerationDate = null;
    }

    public void markEmailAsVerified() {
        if(this.emailVerifiedAt != null) {
            return;
        }

        this.emailVerifiedAt = LocalDate.now();
        this.emailVerificationCode = null;
        this.emailCodeGenerationDate = null;
    }

    public String getProfilePictureUrl() {
        if(profilePicture == null) {
            return "/api/images/default-pfp";
        }
        return profilePicture.getImageUrl();
    }

    public void setPassword(String password) {
        if(this.password != null) {
            this.passwordUpdatedAt = LocalDateTime.now();
        }
        this.password = password;
    }

    public boolean canUpdatePassword() {
        if(this.passwordUpdatedAt == null)
            return true;

        return ChronoUnit.HOURS.between(this.passwordUpdatedAt, LocalDateTime.now()) >= 24;
    }

    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }

    public boolean hasIdentityVerified() {
        return identityVerifiedAt != null;
    }

}
