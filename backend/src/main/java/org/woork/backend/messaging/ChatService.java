package org.woork.backend.messaging;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.exceptions.exceptions.ChatDoesNotExistException;
import org.woork.backend.exceptions.exceptions.UnableToCreateChatException;
import org.woork.backend.messaging.events.ChatReadEvent;
import org.woork.backend.messaging.events.NewChatEvent;
import org.woork.backend.messaging.events.NewMessageEvent;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.messaging.models.Message;
import org.woork.backend.messaging.repositories.ChatRepository;
import org.woork.backend.messaging.repositories.MessageRepository;
import org.woork.backend.messaging.requests.MessagePayload;
import org.woork.backend.messaging.resources.ChatResource;
import org.woork.backend.messaging.resources.MessageResource;
import org.woork.backend.messaging.resources.MessagesListRecipientResource;
import org.woork.backend.pendingjob.PendingJobService;
import org.woork.backend.user.User;
import org.woork.backend.user.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {
    private static final Log log = LogFactory.getLog(ChatService.class);
    private final SimpMessagingTemplate template;
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final PendingJobService pendingJobService;

    @Autowired
    public ChatService(SimpMessagingTemplate template, AuthenticationService authenticationService, UserService userService, ChatRepository chatRepository, MessageRepository messageRepository, PendingJobService pendingJobService) {
        this.template = template;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.pendingJobService = pendingJobService;
    }

    private boolean chatBelongsToUser(Long chatId, User user) {
        Chat chat = chatRepository.findById(chatId).orElseThrow(ChatDoesNotExistException::new);

        return chat.getParticipants().contains(user);
    }

    public void createChatAndSendMessage(MessagePayload payload) {
        User sender = authenticationService.getCurrentUser();

        String receiverUsername = payload.getReceiver();
        User receiver = userService.getUserByUsername(receiverUsername);

        //check if chat already exists
        chatRepository.findByParticipantsIn(List.of(sender, receiver)).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Chat already created"
        ));

        if(!pendingJobService.pendingJobRelationExists(sender, receiver)) {
            throw new UnableToCreateChatException();
        }

        Chat chat = new Chat(List.of(sender, receiver));
        chatRepository.save(chat);

        Message message = new Message(sender, payload.getContent(), chat, payload.getType());
        messageRepository.save(message);

        template.convertAndSendToUser(
                receiverUsername,
                "/queue/messages",
                new NewChatEvent(
                        new MessageResource(message)
                )
        );

        template.convertAndSendToUser(
                sender.getUsername(),
                "/queue/messages",
                new NewChatEvent(
                        new MessageResource(message)
                )
        );
    }

    public void sendMessage(Long chatId, MessagePayload payload) {
        User sender = authenticationService.getCurrentUser();
        Chat chat = chatRepository.findById(chatId).orElseThrow(ChatDoesNotExistException::new);
        List<User> participants = chat.getParticipants();

        if(!participants.contains(sender))
            throw new ChatDoesNotExistException();

        String receiverUsername = payload.getReceiver();

        Message message = new Message(sender, payload.getContent(), chat, payload.getType());
        messageRepository.save(message);

        template.convertAndSendToUser(
                receiverUsername,
                "/queue/messages",
                new NewMessageEvent(
                        new MessageResource(message)
                )
        );
        template.convertAndSendToUser(
                sender.getUsername(),
                "/queue/messages",
                new NewMessageEvent(
                        new MessageResource(message)
                )
        );
    }

    public List<MessagesListRecipientResource> getUserChats(User user) {
        List<Chat> chats = chatRepository.findAllByParticipantsContaining(user).orElse(new ArrayList<>());

        return chats.stream().map(
                chat -> {
                    List<User> users = chat.getParticipants();
                    User otherUser = users.get(0).getId().equals(user.getId()) ? users.get(1) : users.get(0);

                    Message lastMessage = messageRepository.findFirstByChatOrderByIdDesc(chat);
                    int messagesUnread = messageRepository.countAllByChatAndSenderAndReadAtIsNull(chat, otherUser);
                    log.info(messagesUnread);
                    return new MessagesListRecipientResource(otherUser, lastMessage, messagesUnread);
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

    public void readChat(Long chatId) {
        User user = authenticationService.getCurrentUser();

        if(!chatBelongsToUser(chatId, user))
            throw new ChatDoesNotExistException();

        Chat chat = chatRepository.findById(chatId).orElseThrow(ChatDoesNotExistException::new);

        List<User> participants = chat.getParticipants();
        User otherUser = participants.get(0).getId().equals(user.getId()) ? participants.get(1) : participants.get(0);

        List<Message> messages = messageRepository.findAllByChatAndSenderAndReadAtIsNull(chat, otherUser);

        if(messages.isEmpty())
            return;

        log.info(messages.get(0));

        messages.forEach(
                message -> {
                    message.setReadAt(LocalDateTime.now());
                }
        );

        messageRepository.saveAll(messages);

        String receiverUsername = participants.get(0).getUsername().equals(user.getUsername())
                ? participants.get(1).getUsername() : participants.get(0).getUsername();

        template.convertAndSendToUser(
                receiverUsername,
                "/queue/messages",
                new ChatReadEvent(
                        chatId
                )
        );
    }
}
