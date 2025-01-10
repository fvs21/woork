package org.woork.backend.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

public enum Role {
    USER,
    ADMIN,
    REVIEWER
}
