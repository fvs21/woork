package org.woork.backend.messaging.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.enums.MessageType;
import org.woork.backend.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Message {
    @Id
    @SequenceGenerator(
            name = "message_sequence",
            sequenceName = "message_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "message_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User sender;

    @Column(length = 2000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    @JsonIgnore
    private Chat chat;

    private LocalDateTime sentAt;

    private LocalDateTime readAt;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    public Message() {
        this.sentAt = LocalDateTime.now();
    }

    public Message(User sender, String content, Chat chat, MessageType type) {
        this.sender = sender;
        this.content = content;
        this.type = type;
        this.chat = chat;
        this.sentAt = LocalDateTime.now();
    }
}
