package org.woork.backend.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationObjectRepository extends JpaRepository<NotificationObject, Long> {
}
