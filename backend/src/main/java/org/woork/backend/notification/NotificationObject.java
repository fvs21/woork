package org.woork.backend.notification;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

@Entity
@Getter
@Setter
public class NotificationObject {
    @Id
    @SequenceGenerator(
            name = "notification_object_sequence",
            sequenceName = "notification_object_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "notification_object_sequence"
    )
    @JsonIgnore
    @Column(name = "notification_object_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private NotificationType entity_type;

    private Long entity_id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private User author;

    public NotificationObject() {}

    public NotificationObject(NotificationType entity_type, Long entity_id) {
        this.entity_type = entity_type;
        this.entity_id = entity_id;
    }
}
