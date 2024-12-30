package org.woork.backend.messaging.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
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

    @OneToMany(fetch = FetchType.EAGER) //As I use it in every method
    @JoinColumn(name = "participant_id")
    private List<User> participants;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "chat")
    private List<Message> messages;

    public Chat() {}

    public Chat(List<User> participants) {
        this.participants = participants;
        this.createdAt = LocalDateTime.now();
        this.messages = new ArrayList<>();
    }
}
