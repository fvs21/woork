package org.woork.backend.notification.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.notification.models.NotificationObject;

@Repository
public interface NotificationObjectRepository extends JpaRepository<NotificationObject, Long> {
}
