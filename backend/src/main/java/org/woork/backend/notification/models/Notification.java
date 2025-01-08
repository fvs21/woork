package org.woork.backend.notification.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "notifier_id", referencedColumnName = "user_id")
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "notification_object")
    private NotificationObject notificationObject;

    private boolean hasRead;

    private boolean isHidden;

    private LocalDateTime createdAt;

    public Notification() {
        this.createdAt = LocalDateTime.now();
        this.hasRead = false;
        this.isHidden = false;
    }

    public Notification(User receiver, NotificationObject notificationObject) {
        this.receiver = receiver;
        this.notificationObject = notificationObject;
        this.createdAt = LocalDateTime.now();
        this.hasRead = false;
        this.isHidden = false;
    }
}
