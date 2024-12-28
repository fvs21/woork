package org.woork.backend.messaging.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<List<Chat>> findAllByParticipantsContaining(User user);
}
