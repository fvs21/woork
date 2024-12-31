package org.woork.backend.messaging.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.messaging.models.Message;
import org.woork.backend.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Message findFirstByChatOrderByIdDesc(Chat chat);

    Optional<List<Message>> findAllByChatOrderBySentAtDesc(Chat chat);

    int countAllByChatAndSenderAndReadAtIsNull(Chat chat, User sender);

    List<Message> findAllByChatAndSenderAndReadAtIsNull(Chat chat, User user);
}
