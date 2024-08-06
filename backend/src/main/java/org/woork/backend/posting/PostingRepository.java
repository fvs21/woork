package org.woork.backend.posting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.location.Location;
import org.woork.backend.user.User;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Long> {
    Optional<Posting> findPostingById(Long id);
    Optional<Set<Posting>> findAllByLocationAndCategory(Location location, Category category);
    Optional<Set<Posting>> findAllByLocation(Location location);
    Optional<Set<Posting>> findByAuthor(User author);
}
