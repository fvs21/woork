package org.woork.backend.messaging;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.exceptions.ChatDoesNotExistException;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.messaging.models.Message;
import org.woork.backend.messaging.repositories.ChatRepository;
import org.woork.backend.messaging.repositories.MessageRepository;
import org.woork.backend.messaging.requests.MessagePayload;
import org.woork.backend.messaging.resources.ChatResource;
import org.woork.backend.messaging.resources.MessageResource;
import org.woork.backend.messaging.resources.MessagesListRecipientResource;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ChatService {
    private static final Log log = LogFactory.getLog(ChatService.class);
    private final SimpMessagingTemplate template;
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public ChatService(SimpMessagingTemplate template, AuthenticationService authenticationService, UserService userService, ChatRepository chatRepository, MessageRepository messageRepository) {
        this.template = template;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    public void createChatAndSendMessage(MessagePayload payload) {
        User sender = authenticationService.getCurrentUser();

        String receiverUsername = payload.getReceiver();
        User receiver = userService.getUserByUsername(receiverUsername);

        Chat chat = new Chat(List.of(sender, receiver));
        chatRepository.save(chat);

        Message message = new Message(sender, payload.getContent(), chat, payload.getType());
        messageRepository.save(message);

        template.convertAndSendToUser(
                receiverUsername,
                "/queue/messages",
                new MessageResource(message)
        );

        template.convertAndSendToUser(
                sender.getUsername(),
                "/queue/messages",
                chat.getId()
        );
    }

    public void sendMessage(Long chatId, MessagePayload payload) {
        User sender = authenticationService.getCurrentUser();

        String receiverUsername = payload.getReceiver();

        Chat chat = chatRepository.findById(chatId).orElseThrow(ChatDoesNotExistException::new);

        Message message = new Message(sender, payload.getContent(), chat, payload.getType());
        messageRepository.save(message);

        template.convertAndSendToUser(
                receiverUsername,
                "/queue/messages",
                new MessageResource(message)
        );
        template.convertAndSendToUser(
                sender.getUsername(),
                "/queue/messages",
                new MessageResource(message)
        );
    }

    public List<MessagesListRecipientResource> getUserChats(User user) {
        List<Chat> chats = chatRepository.findAllByParticipantsContaining(user).orElse(new ArrayList<>());

        return chats.stream().map(
                chat -> {
                    List<User> users = chat.getParticipants();
                    User otherUser = users.get(0).getId().equals(user.getId()) ? users.get(1) : users.get(0);

                    Message lastMessage = messageRepository.findFirstByChatOrderByIdDesc(chat);
                    return new MessagesListRecipientResource(otherUser, lastMessage);
                }
        ).toList();
    }

    public ChatResource loadChat(User user, Long id) {
        Chat chat = chatRepository.findById(id).orElseThrow(ChatDoesNotExistException::new);

        if(chat.getParticipants().stream().noneMatch(p -> p.getId().equals(user.getId()))) {
            throw new ChatDoesNotExistException();
        }

        List<Message> messages = messageRepository.findAllByChatOrderBySentAtDesc(chat).orElse(new ArrayList<>());
        return new ChatResource(chat, messages);
    }
}
