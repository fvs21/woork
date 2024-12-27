package org.woork.backend.messaging.models;

import jakarta.persistence.*;
import org.woork.backend.user.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Chat {
    @Id
    @SequenceGenerator(
            name = "chat_sequence",
            sequenceName = "chat_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "chat_sequence"
    )
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "participant_id")
    private Set<User> participants;

    private LocalDateTime createdAt;

    @OneToMany
    private List<Message> messages;

    public Chat() {}

    public Chat(Set<User> participants) {
        this.participants = participants;
        this.createdAt = LocalDateTime.now();
        this.messages = new ArrayList<>();
    }
}
