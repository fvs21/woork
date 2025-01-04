package org.woork.backend.pendingjob.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

@Getter
@Setter
public class HostResource {
    private String name;
    private String pfpUrl;
    private String username;

    public HostResource(User user) {
        this.name = user.getFullName();
        this.pfpUrl = user.getProfilePictureUrl();
        this.username = user.getUsername();
    }
}
