package org.woork.backend.messaging.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.models.Message;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageResource {
    private ParticipantResource sender;
    private String content;
    private LocalDateTime sentAt;
    private LocalDateTime readAt;
    private String type;
    private Long chatId;

    public MessageResource(Message message) {
        this.sender = new ParticipantResource(message.getSender());
        this.content = message.getContent();
        this.sentAt = message.getSentAt();
        this.readAt = message.getReadAt();
        this.type = message.getType().toString().toLowerCase();
        this.chatId = message.getChat().getId();
    }
}
