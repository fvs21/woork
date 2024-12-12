package org.woork.backend.postingapplication;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.posting.Posting;
import org.woork.backend.user.User;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posting_id")
    private Posting posting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String status;

    public PostingApplication() {
        this.status = Status.REQUESTED.toString();
    }

    public PostingApplication(Posting posting, User user) {
        this.posting = posting;
        this.user = user;
        this.status = Status.REQUESTED.toString();
    }
}
