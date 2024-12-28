package org.woork.backend.messaging.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.messaging.models.Message;
import org.woork.backend.user.User;

@Getter
@Setter
public class MessagesListRecipientResource {
    private ParticipantResource chatUser;
    private MessageResource lastMessage;
    private int messagesUnread;
    private Long chatId;

    public MessagesListRecipientResource(User chatUser, Message message) {
        this.chatUser = new ParticipantResource(chatUser);
        this.lastMessage = new MessageResource(message);
        this.messagesUnread = 0;
        this.chatId = message.getChat().getId();
    }
}
