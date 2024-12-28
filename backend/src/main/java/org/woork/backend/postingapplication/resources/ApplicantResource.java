package org.woork.backend.postingapplication.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.worker.models.Worker;

@Getter
@Setter
public class ApplicantResource {
    private String pfpUrl;
    private String name;
    private String username;
    private String rating;
    private Long id;

    public ApplicantResource(Worker worker) {
        this.pfpUrl = "http://localhost:8000" + worker.getUser().getProfilePictureUrl();
        this.name = worker.getUser().getFullName();
        this.username = worker.getUser().getUsername();
        this.rating = String.valueOf(worker.getRating());
        this.id = worker.getId();
    }
}
