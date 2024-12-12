package org.woork.backend.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

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
    private Instant createdAt;

    public PasswordResetToken() {
        this.createdAt = Instant.now();
    }

    public PasswordResetToken(String token) {
        this.token = token;
        this.createdAt = Instant.now();
    }

}
