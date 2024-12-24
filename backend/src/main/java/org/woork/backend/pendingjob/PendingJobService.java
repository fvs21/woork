package org.woork.backend.pendingjob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.posting.Posting;
import org.woork.backend.user.User;
import org.woork.backend.worker.Worker;

import java.util.List;

@Service
public class PendingJobService {
    private final PendingJobRepository pendingJobRepository;

    @Autowired
    public PendingJobService(PendingJobRepository pendingJobRepository) {
        this.pendingJobRepository = pendingJobRepository;
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
}
