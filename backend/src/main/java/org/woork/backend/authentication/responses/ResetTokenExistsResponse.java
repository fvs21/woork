package org.woork.backend.authentication.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ResetTokenExistsResponse {
    private boolean exists;

    public ResetTokenExistsResponse() {}

    public ResetTokenExistsResponse(boolean exists) {
        this.exists = exists;
    }
}
