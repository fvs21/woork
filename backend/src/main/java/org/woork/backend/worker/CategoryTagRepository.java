package org.woork.backend.worker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryTagRepository extends JpaRepository<CategoryTag, Long> {
}
