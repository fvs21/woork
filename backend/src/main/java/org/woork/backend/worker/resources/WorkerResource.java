package org.woork.backend.worker.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.worker.models.CategoryTag;
import org.woork.backend.worker.models.Worker;

import java.util.Set;

@Getter
@Setter
public class WorkerResource {
    private String name;
    private String rating;
    private int jobs_completed;
    private Set<CategoryTag> categories;
    private String username;
    private String pfpUrl;

    public WorkerResource(Worker worker) {
        this.name = worker.getUser().getFullName();
        this.jobs_completed = worker.getJobsCompleted();
        this.rating = String.valueOf(worker.getRating());
        this.categories = worker.getCategories();
        this.username = worker.getUser().getUsername();
        this.pfpUrl = worker.getUser().getProfilePictureUrl();
    }
}
