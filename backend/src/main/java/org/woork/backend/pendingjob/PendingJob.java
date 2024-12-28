package org.woork.backend.pendingjob;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.posting.Posting;
import org.woork.backend.user.User;
import org.woork.backend.worker.models.Worker;

import java.time.LocalDateTime;

@Entity
@Table(name = "pending_job")
@Getter
@Setter
public class PendingJob {
    @Id
    @SequenceGenerator(
            name = "pending_job_sequence",
            sequenceName = "pending_job_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pending_job_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User host;

    private LocalDateTime location_shared_at;

    private LocalDateTime completed_at;

    @OneToOne
    @JoinColumn(name = "posting_id")
    private Posting posting;

    public PendingJob() {}

    public PendingJob(Worker worker, User host, Posting posting) {
        this.worker = worker;
        this.host = host;
        this.posting = posting;
    }
}
