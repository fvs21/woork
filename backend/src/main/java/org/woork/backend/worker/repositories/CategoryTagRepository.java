package org.woork.backend.worker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.woork.backend.worker.models.CategoryTag;

@Repository
public interface CategoryTagRepository extends JpaRepository<CategoryTag, String> {

}
