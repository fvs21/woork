package org.woork.backend.messaging.controllers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.woork.backend.messaging.ChatService;
import org.woork.backend.messaging.requests.MessagePayload;

@Controller
public class ChatController {
    private static final Log log = LogFactory.getLog(ChatController.class);
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat.create")
    public void create(@Payload MessagePayload payload) {
        chatService.createChatAndSendMessage(payload);
    }

    @MessageMapping("/chat.sendMessage/{chatId}")
    public void sendMessage(@DestinationVariable String chatId, @Payload MessagePayload messagePayload) {
        chatService.sendMessage(Long.parseLong(chatId), messagePayload);
    }

    @MessageMapping("/chat.read/{chatId}")
    public void readChat(@DestinationVariable String chatId) {
        chatService.readChat(Long.parseLong(chatId));
    }
}

