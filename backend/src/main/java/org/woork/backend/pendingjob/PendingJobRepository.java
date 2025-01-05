package org.woork.backend.pendingjob;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.posting.Posting;
import org.woork.backend.user.User;
import org.woork.backend.worker.models.Worker;

import java.util.List;
import java.util.Optional;

@Repository
public interface PendingJobRepository extends JpaRepository<PendingJob, Long> {
    long countByHost(User host);
    Optional<List<PendingJob>> findAllByHost(User host);
    Optional<PendingJob> findByWorkerAndHost(Worker worker, User host);
    boolean existsByPosting(Posting posting);
    Optional<List<PendingJob>> findAllByWorker(Worker worker);
    Optional<PendingJob> findByPosting(Posting posting);
}
