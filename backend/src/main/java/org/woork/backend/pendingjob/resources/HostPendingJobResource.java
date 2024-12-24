package org.woork.backend.pendingjob.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.pendingjob.PendingJob;
import org.woork.backend.posting.resources.PostingResource;
import org.woork.backend.worker.resources.WorkerResource;

import java.time.LocalDateTime;

@Getter
@Setter
public class HostPendingJobResource {
    private Long jobId;
    private WorkerResource worker;
    private String postingUrl;
    private String postingTitle;
    private LocalDateTime location_shared_at;
    private LocalDateTime completed_at;

    public HostPendingJobResource(PendingJob pendingJob, String postingHashId) {
        this.jobId = pendingJob.getId();
        this.worker = new WorkerResource(pendingJob.getWorker());
        this.postingUrl = postingHashId;
        this.postingTitle = pendingJob.getPosting().getTitle();
        this.location_shared_at = pendingJob.getLocation_shared_at();
        this.completed_at = pendingJob.getCompleted_at();
    }
}
