package org.woork.backend.notification;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Notification {
    @Id
    @SequenceGenerator(
            name = "notification_sequence",
            sequenceName = "notification_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "notification_sequence"
    )
    @JsonIgnore
    @Column(name = "notification_id")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "notifier_id", referencedColumnName = "user_id")
    private User receiver;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private NotificationObject notificationObject;

    private boolean hasRead;

    private boolean isHidden;

    private LocalDate createdAt;

    public Notification() {
        this.createdAt = LocalDate.now();
        this.hasRead = false;
        this.isHidden = false;
    }

    public Notification(User notifier, NotificationObject notificationObject) {
        this.receiver = notifier;
        this.notificationObject = notificationObject;
        this.createdAt = LocalDate.now();
        this.hasRead = false;
        this.isHidden = false;
    }
}
