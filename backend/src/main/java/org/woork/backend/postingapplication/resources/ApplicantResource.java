package org.woork.backend.postingapplication.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.user.User;

@Getter
@Setter
public class ApplicantResource {
    private String pfpUrl;
    private String name;
    private String username;
    private String rating;

    public ApplicantResource(User user) {
        this.pfpUrl = "http://localhost:8000" + user.getProfilePictureUrl();
        this.name = user.getFullName();
        this.username = user.getUsername();
        this.rating = "4.37";
    }
}
