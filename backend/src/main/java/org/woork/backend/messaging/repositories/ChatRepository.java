package org.woork.backend.messaging.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<List<Chat>> findAllByParticipantsContaining(User user);
    Optional<Chat> findByParticipantsContainingAndParticipantsContaining(User user1, User user2);
    boolean existsByParticipantsContainingAndParticipantsContaining(User user1, User user2);

    @Query(value = "SELECT c.chat_id, c.created_at FROM chat c LEFT JOIN user_chats uc ON c.chat_id = uc.chat_id WHERE uc.user_id = :userId " +
            "ORDER BY (SELECT sent_at FROM message m WHERE m.chat_id = c.chat_id ORDER BY sent_at DESC LIMIT 1) DESC", nativeQuery = true)
    List<Chat> findAllUsersChat(@Param("userId") Long userId);
}
