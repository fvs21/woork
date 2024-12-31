package org.woork.backend.messaging.events;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.resources.MessageResource;

@Getter
@Setter
public class NewChatEvent {
    private String eventType = "new_chat";
    private MessageResource eventPayload;

    public NewChatEvent(MessageResource message) {
        this.eventPayload = message;
    }
}
