package org.woork.backend.profile.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.worker.models.CategoryTag;
import org.woork.backend.worker.models.Worker;

import java.util.Set;

@Getter
@Setter
public class PublicWorkerProfileResource extends PublicProfileResource {
    private Set<CategoryTag> categories;
    private int jobsCompleted;

    public PublicWorkerProfileResource(Worker worker) {
        super(worker.getUser());
        this.categories = worker.getCategories();
        this.jobsCompleted = worker.getJobsCompleted();
    }
}
