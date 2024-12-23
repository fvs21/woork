package org.woork.backend.passwordreset;

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
    private Long userId;

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
