package org.woork.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailOrPhone(String email, String phone);
    Optional<User> findByUsername(String username);
    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);
    long countByFirstNameAndLastName(String firstName, String lastName);
}
