package org.woork.backend.pendingjob;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface PendingJobRepository extends JpaRepository<PendingJob, Long> {
    long countByHost(User host);
    Optional<List<PendingJob>> findAllByHost(User host);
}
