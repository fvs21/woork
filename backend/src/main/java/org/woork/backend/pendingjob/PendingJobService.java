package org.woork.backend.pendingjob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.pendingjob.resources.HostPendingJobResource;
import org.woork.backend.posting.Posting;
import org.woork.backend.url.UrlService;
import org.woork.backend.user.User;
import org.woork.backend.worker.Worker;

import java.util.ArrayList;
import java.util.List;

@Service
public class PendingJobService {
    private final PendingJobRepository pendingJobRepository;
    private final UrlService urlService;

    @Autowired
    public PendingJobService(PendingJobRepository pendingJobRepository, UrlService urlService) {
        this.pendingJobRepository = pendingJobRepository;
        this.urlService = urlService;
    }

    public PendingJob createJobSession(User host, Worker worker, Posting posting) {
        PendingJob pendingJob = new PendingJob();
        pendingJob.setHost(host);
        pendingJob.setWorker(worker);
        pendingJob.setPosting(posting);
        return pendingJobRepository.save(pendingJob);
    }

    public Long getPendingJobCount(User user) {
        return pendingJobRepository.countByHost(user);
    }

    public List<HostPendingJobResource> getUserPendingJobs(User user) {
        List<PendingJob> pendingJobs = pendingJobRepository.findAllByHost(user).orElse(new ArrayList<>());

        return pendingJobs.stream().map(
                pending -> {
                    Posting posting = pending.getPosting();
                    String postingUrl = urlService.encodeIdToUrl(posting.getId());
                    return new HostPendingJobResource(pending, postingUrl);
                }
        ).toList();
    }
}
