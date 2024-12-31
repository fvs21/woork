package org.woork.backend.postingapplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.posting.Posting;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PostingApplicationRepository extends JpaRepository<PostingApplication, Long> {
    boolean existsByPostingIdAndStatus(Long postingId, String status);
    Optional<PostingApplication> findByPostingIdAndWorkerId(Long postingId, Long workerId);
}
