package org.woork.backend.worker;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CategoryTag {
    @Id
    private String category;

    public CategoryTag(String category) {
        this.category = category;
    }

    public CategoryTag() {}
}
