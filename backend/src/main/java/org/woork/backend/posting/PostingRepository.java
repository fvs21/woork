package org.woork.backend.posting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.address.Address;
import org.woork.backend.user.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PostingRepository extends JpaRepository<Posting, Long> {
    Optional<Posting> findPostingById(Long id);
    Optional<Set<Posting>> findAllByAddress(Address address);
    Optional<Set<Posting>> findByAuthor(User author);
    Optional<Set<Posting>> findByAddress_Id(Long id);
    Optional<Set<Posting>> findByAuthor_Id(Long id);
    Optional<List<Posting>> findPostingsByAddressAndCategory(Address address, String category);
    Optional<List<Posting>> findAllByCategory(String category);
    Optional<Set<Posting>> findAllByAuthorOrderByCreatedAtDesc(User author);
}
