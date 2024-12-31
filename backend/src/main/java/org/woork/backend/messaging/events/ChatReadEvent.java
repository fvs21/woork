package org.woork.backend.messaging.events;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatReadEvent {
    private String eventType = "chat_read";
    private Long eventPayload;

    public ChatReadEvent(Long chatId) {
        this.eventPayload = chatId;
    }
}
