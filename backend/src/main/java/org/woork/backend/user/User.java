package org.woork.backend.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "application_user")
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
    private Long id;
    private String first_name;
    private String last_name;

    @Column(unique = true)
    private String phone;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    private Date dateOfBirth;

    @JsonIgnore
    private boolean verified;

    @JsonIgnore
    private String verificationCode;

    @JsonIgnore
    private Date code_generated_date;

    @JsonIgnore
    private Timestamp code_generated_timestamp;

    public User() {}

    public User(String first_name, String last_name, String phone, String email, Date dateOfBirth, String password ) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.verified = false;
        this.dateOfBirth = dateOfBirth;
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

    public boolean isVerified() {
        return verified;
    }
    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Date getCode_generated_date() {
        return code_generated_date;
    }

    public void setCode_generated_date(Date code_generated_date) {
        this.code_generated_date = code_generated_date;
    }

    public Timestamp getCode_generated_timestamp() {
        return code_generated_timestamp;
    }

    public void setCode_generated_timestamp(Timestamp code_generated_timestamp) {
        this.code_generated_timestamp = code_generated_timestamp;
    }
}
