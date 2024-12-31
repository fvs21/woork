package org.woork.backend.messaging.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.messaging.models.Message;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ChatResource {
    private Long id;
    private List<MessageResource> messages;
    private List<ParticipantResource> participants;
    private LocalDateTime createdAt;

    public ChatResource(Chat chat, List<Message> messages) {
        this.id = chat.getId();
        this.createdAt = chat.getCreatedAt();
        this.participants = chat.getParticipants().stream().map(ParticipantResource::new).toList();
        this.messages = messages.stream().map(MessageResource::new).toList();
    }
}
