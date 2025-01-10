package org.woork.backend.verification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationData, Long> {
    Optional<VerificationData> findByUserId(Long userId);
}
