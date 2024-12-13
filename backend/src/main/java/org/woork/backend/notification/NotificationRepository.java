package org.woork.backend.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Optional<List<Notification>> findByReceiverOrderByCreatedAtDesc(User notifier);
    Optional<List<Notification>> findByReceiverAndHasRead(User user, boolean read);
}
