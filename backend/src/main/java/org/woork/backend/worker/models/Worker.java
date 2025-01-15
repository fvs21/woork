package org.woork.backend.worker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

import java.util.*;

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

    @OneToMany
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

    @Override
    public boolean equals(Object o) {
        return Objects.equals(this.id, ((Worker) o).getId());
    }
}
