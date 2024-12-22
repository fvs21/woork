package org.woork.backend.worker;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
public class Worker {
    @Id
    @SequenceGenerator(
            name = "worker_sequence",
            sequenceName = "worker_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "worker_sequence"
    )
    @JsonIgnore
    @Column(name = "worker_id")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    private float rating;

    @Column(name = "jobs_completed")
    private int jobsCompleted;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<CategoryTag> categories;

    public Worker(User user) {
        this.user = user;
        this.rating = 0;
        this.jobsCompleted = 0;
        this.categories = new HashSet<>();
    }

    public Worker() {
        this.rating = 0;
        this.jobsCompleted = 0;
        this.categories = new HashSet<>();
    }
}
