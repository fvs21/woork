package org.woork.backend.pendingjob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.messaging.ChatService;
import org.woork.backend.messaging.models.Chat;
import org.woork.backend.messaging.repositories.ChatRepository;
import org.woork.backend.pendingjob.resources.HostPendingJobResource;
import org.woork.backend.pendingjob.resources.WorkerPendingJobResource;
import org.woork.backend.posting.Posting;
import org.woork.backend.url.UrlService;
import org.woork.backend.user.User;
import org.woork.backend.worker.WorkerService;
import org.woork.backend.worker.models.Worker;

import java.util.ArrayList;
import java.util.List;

@Service
public class PendingJobService {
    private final PendingJobRepository pendingJobRepository;
    private final UrlService urlService;
    private final WorkerService workerService;
    private final ChatRepository chatRepository;

    @Autowired
    public PendingJobService(PendingJobRepository pendingJobRepository, UrlService urlService, WorkerService workerService, ChatRepository chatRepository) {
        this.pendingJobRepository = pendingJobRepository;
        this.urlService = urlService;
        this.workerService = workerService;
        this.chatRepository = chatRepository;
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

                    Chat chat = chatRepository.findByParticipantsContainingAndParticipantsContaining(user, pending.getWorker().getUser()).orElse(null);
                    if(chat == null)
                        return new HostPendingJobResource(pending, postingUrl);

                    return new HostPendingJobResource(pending, postingUrl, chat.getId());
                }
        ).toList();
    }

    //Check if there is an active job between 2 users.
    //One of them must be a worker
    public boolean pendingJobRelationExists(User user1, User user2) {
        if(!user1.isWorker() && !user2.isWorker()) {
            return false;
        }

        if(user1.isWorker()) {
            Worker worker = workerService.getWorker(user1);
            PendingJob job = pendingJobRepository.findByWorkerAndHost(worker, user2).orElse(null);

            if(job != null && job.getCompleted_at() == null)
                return true;
        }
        if(user2.isWorker()) {
            Worker worker = workerService.getWorker(user2);
            PendingJob job = pendingJobRepository.findByWorkerAndHost(worker, user1).orElse(null);

            return job != null && job.getCompleted_at() == null;
        }
        return false;
    }

    public boolean pendingJobExistForPosting(Posting posting) {
        return pendingJobRepository.existsByPosting(posting);
    }

    public List<WorkerPendingJobResource> getWorkerPendingJobs(User user) {
        Worker worker = workerService.getWorker(user);

        List<PendingJob> pendingJobs = pendingJobRepository.findAllByWorker(worker).orElse(new ArrayList<>());

        return pendingJobs.stream().map(
                job -> {
                    Posting posting = job.getPosting();
                    String postingUrl = urlService.encodeIdToUrl(posting.getId());

                    Chat chat = chatRepository.findByParticipantsContainingAndParticipantsContaining(user, job.getHost()).orElse(null);

                    if(chat == null)
                        return new WorkerPendingJobResource(job, postingUrl);

                    return new WorkerPendingJobResource(job, postingUrl, chat.getId());
                }
        ).toList();
    }
}
