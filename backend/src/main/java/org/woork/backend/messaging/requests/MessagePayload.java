package org.woork.backend.messaging.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.woork.backend.messaging.enums.MessageType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessagePayload {
    private String receiver;
    private String content;
    private MessageType type;
}
