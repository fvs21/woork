package org.woork.backend.rating;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.posting.Posting;
import org.woork.backend.user.User;
import org.woork.backend.worker.Worker;

@Getter
@Setter
@Entity
@Table(name = "rating",
    indexes = {
        @Index(name = "host_index", columnList = "host_id"),
            @Index(name = "worker_index", columnList = "worker_id"),
            @Index(name = "posting_index", columnList = "posting_id", unique = true)
    }
)
public class Rating {
    @Id
    @SequenceGenerator(
            name = "rating_sequence",
            sequenceName = "rating_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "rating_sequence"
    )
    @JsonIgnore
    @Column(name = "rating_id")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "host_id")
    private User host;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posting_id")
    private Posting posting;

    @Column(name = "host_rating")
    private float hostRating;

    @Column(name = "worker_rating")
    private float workerRating;

    @Column(name = "host_comment")
    private String hostComment;

    @Column(name = "worker_comment")
    private String workerComment;

    public Rating() {}

    public Rating(
            User host,
            Worker worker,
            Posting posting,
            float hostRating,
            float workerRating,
            String hostComment,
            String workerComment
    ) {
        this.host = host;
        this.worker = worker;
        this.posting = posting;
        this.hostRating = hostRating;
        this.workerRating = workerRating;
        this.hostComment = hostComment;
        this.workerComment = workerComment;
    }
}
