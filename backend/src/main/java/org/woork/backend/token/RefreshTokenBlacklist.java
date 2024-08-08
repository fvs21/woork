package org.woork.backend.token;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table
public class RefreshTokenBlacklist {
    @Id
    @SequenceGenerator(
            name = "token_sequence",
            sequenceName = "token_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "token_sequence"
    )
    @JsonIgnore
    @Column(name = "token_id")
    private Long id;

    @Column(length = 7000)
    private String token;

    private Instant expiresAt;

    public RefreshTokenBlacklist() {}

    public RefreshTokenBlacklist(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

}
