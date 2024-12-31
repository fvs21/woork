package org.woork.backend.messaging.events;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.resources.MessageResource;

@Getter
@Setter
public class NewMessageEvent {
    private String eventType = "new_message";
    private MessageResource eventPayload;

    public NewMessageEvent(MessageResource message) {
        this.eventPayload = message;
    }
}
