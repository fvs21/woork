package org.woork.backend.messaging.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.messaging.models.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Message findFirstByChatOrderByIdDesc(Chat chat);
}
