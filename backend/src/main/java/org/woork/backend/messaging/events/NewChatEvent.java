package org.woork.backend.messaging.events;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.models.Message;
import org.woork.backend.messaging.resources.MessageResource;
import org.woork.backend.messaging.resources.MessagesListRecipientResource;
import org.woork.backend.messaging.resources.NewChatResource;
import org.woork.backend.messaging.resources.ParticipantResource;
import org.woork.backend.user.User;

@Getter
@Setter
public class NewChatEvent {
    private String eventType = "new_chat";
    private MessagesListRecipientResource eventPayload; //chatId

    public NewChatEvent(User receiver, Message message) {
        this.eventPayload = new MessagesListRecipientResource(receiver, message, 0);
    }
}
