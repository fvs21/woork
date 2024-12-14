package org.woork.backend.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;

@Setter
@Getter
@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {
    @Id
    private String phone;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    @Column(unique = true)
    private String token;

    @Column(name = "created_at")
    private LocalDate createdAt;

    public PasswordResetToken() {
        this.createdAt = LocalDate.now();
    }

    public PasswordResetToken(String token) {
        this.token = token;
        this.createdAt = LocalDate.now();
    }

    public boolean isValid() {
        return ChronoUnit.HOURS.between(LocalDate.now(), createdAt) < 2;
    }

}
