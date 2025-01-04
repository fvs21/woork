package org.woork.backend.pendingjob.resources;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.pendingjob.PendingJob;

import java.time.LocalDateTime;

@Getter
@Setter
public class WorkerPendingJobResource {
    private Long jobId;
    private HostResource host;
    private String postingUrl;
    private String postingTitle;
    private LocalDateTime location_shared_at;
    private LocalDateTime completed_at;
    private boolean chatCreated;
    private Long chatId;

    public WorkerPendingJobResource(PendingJob pendingJob, String postingHashId) {
        this.jobId = pendingJob.getId();
        this.host = new HostResource(pendingJob.getHost());
        this.postingUrl = postingHashId;
        this.postingTitle = pendingJob.getPosting().getTitle();
        this.location_shared_at = pendingJob.getLocation_shared_at();
        this.completed_at = pendingJob.getCompleted_at();

        this.chatCreated = false;
    }

    public WorkerPendingJobResource(PendingJob pendingJob, String postingHashId, Long chatId) {
        this.jobId = pendingJob.getId();
        this.host = new HostResource(pendingJob.getHost());
        this.postingUrl = postingHashId;
        this.postingTitle = pendingJob.getPosting().getTitle();
        this.location_shared_at = pendingJob.getLocation_shared_at();
        this.completed_at = pendingJob.getCompleted_at();

        this.chatCreated = true;
        this.chatId = chatId;
    }
}
