package org.woork.backend.messaging.events;

import org.woork.backend.messaging.resources.MessageResource;

public class NewChatEvent {
    private String eventType = "new_chat";
    private MessageResource eventPayload;

    public NewChatEvent(MessageResource message) {
        this.eventPayload = message;
    }
}
