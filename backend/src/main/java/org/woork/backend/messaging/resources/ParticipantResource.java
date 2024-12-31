package org.woork.backend.messaging.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

@Getter
@Setter
public class ParticipantResource {
    private String name;
    private String pfpUrl;
    private String username;

    public ParticipantResource(User user) {
        this.name = user.getFullName();
        this.pfpUrl = user.getProfilePictureUrl();
        this.username = user.getUsername();
    }
}
