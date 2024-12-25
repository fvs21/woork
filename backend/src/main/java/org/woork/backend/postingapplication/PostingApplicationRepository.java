package org.woork.backend.postingapplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PostingApplicationRepository extends JpaRepository<PostingApplication, Long> {
    Optional<PostingApplication> findByPostingIdAndStatus(Long postingId, String status);
    Optional<PostingApplication> findByPostingIdAndWorkerId(Long postingId, Long workerId);
}
