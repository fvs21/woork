package org.woork.backend.postingapplication;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.posting.Posting;
import org.woork.backend.user.User;
import org.woork.backend.worker.Worker;

@Entity(name = "posting_applications")
@Getter
@Setter
public class PostingApplication {
    @Id
    @SequenceGenerator(
            name = "posting_application_sequence",
            sequenceName = "posting_application_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "posting_application_sequence"
    )
    @JsonIgnore
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "posting_id")
    private Posting posting;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Worker worker;

    private String status;

    public PostingApplication() {
        this.status = Status.REQUESTED.name();
    }

    public PostingApplication(Posting posting, Worker worker) {
        this.posting = posting;
        this.worker = worker;
        this.status = Status.REQUESTED.toString();
    }

    public boolean isRejected() {
        return this.status.equals(Status.REJECTED.name());
    }

    public boolean isPending() {
        return this.status.equals(Status.REQUESTED.name());
    }

    public boolean isAccepted() {
        return this.status.equals(Status.ACCEPTED.name());
    }

    public void acceptApplication() {
        this.status = Status.ACCEPTED.name();
    }

    public void rejectApplication() {
        this.status = Status.REJECTED.name();
    }
}
