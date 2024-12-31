package org.woork.backend.messaging.resources;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewChatResource {
    private Long chatId;
    private ParticipantResource participant;

    public NewChatResource(Long chatId, ParticipantResource participant) {
        this.chatId = chatId;
        this.participant = participant;
    }
}
