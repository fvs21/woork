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
    @Column(name = "chat_id")
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_chats",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participants;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private List<Message> messages;

    public Chat() {}

    public Chat(List<User> participants) {
        this.participants = participants;
        this.createdAt = LocalDateTime.now();
        this.messages = new ArrayList<>();
    }
}
