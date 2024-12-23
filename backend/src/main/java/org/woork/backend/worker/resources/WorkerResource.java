package org.woork.backend.worker.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.worker.CategoryTag;
import org.woork.backend.worker.Worker;

import java.util.Set;

@Getter
@Setter
public class WorkerResource {
    private String name;
    private String rating;
    private int jobs_completed;
    private Set<CategoryTag> categories;
    private String username;

    public WorkerResource(Worker worker) {
        this.name = worker.getUser().getFullName();
        this.jobs_completed = worker.getJobsCompleted();
        this.rating = String.valueOf(worker.getRating());
        this.categories = worker.getCategories();
        this.username = worker.getUser().getUsername();
    }
}
