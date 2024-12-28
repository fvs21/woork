package org.woork.backend.messaging.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.models.Message;
import org.woork.backend.user.User;

@Getter
@Setter
public class MessagesListRecipientResource {
    private ParticipantResource participant;
    private MessageResource lastMessage;
    private int messagesUnread;
    private Long chatId;

    public MessagesListRecipientResource(User participant, Message message) {
        this.participant = new ParticipantResource(participant);
        this.lastMessage = new MessageResource(message);
        this.messagesUnread = 0;
        this.chatId = message.getChat().getId();
    }
}
