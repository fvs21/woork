package org.woork.backend.messaging.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.messaging.ChatService;
import org.woork.backend.messaging.resources.ChatResource;
import org.woork.backend.messaging.resources.MessagesListRecipientResource;
import org.woork.backend.user.User;

import java.util.List;

@RestController
@RequestMapping("api/chats")
public class UsersChatController {
    private final ChatService chatService;
    private final AuthenticationService authenticationService;

    @Autowired
    public UsersChatController(ChatService chatService, AuthenticationService authenticationService) {
        this.chatService = chatService;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public List<MessagesListRecipientResource> getUserChats() {
        User user = authenticationService.getCurrentUser();

        return chatService.getUserChats(user);
    }

    @GetMapping("/{id}")
    public ChatResource loadChat(@PathVariable Long id) {
        User user = authenticationService.getCurrentUser();

        return chatService.loadChat(user, id);
    }
}
