package org.woork.backend.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenBlacklist, Long> {
    Optional<RefreshTokenBlacklist> findByToken(String token);
}
