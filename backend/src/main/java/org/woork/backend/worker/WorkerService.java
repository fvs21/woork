package org.woork.backend.worker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.woork.backend.exceptions.UserIsNotRegisteredAsWorkerException;
import org.woork.backend.user.User;
import org.woork.backend.user.UserRepository;
import org.woork.backend.user.resources.UserResource;
import org.woork.backend.worker.resources.WorkerResource;
import org.woork.backend.worker.responses.RegisterWorkerResponse;

@Service
public class WorkerService {
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;

    @Autowired
    public WorkerService(WorkerRepository workerRepository, UserRepository userRepository) {
        this.workerRepository = workerRepository;
        this.userRepository = userRepository;
    }

    public RegisterWorkerResponse registerWorker(User user) {
        Worker worker = new Worker();
        worker.setUser(user);
        workerRepository.save(worker);

        user.setWorker(true);
        userRepository.save(user);

        return new RegisterWorkerResponse(
                new UserResource(user),
                new WorkerResource(worker)
        );
    }

    public Worker getWorker(User user) {
        return workerRepository.findByUser(user).orElseThrow(UserIsNotRegisteredAsWorkerException::new);
    }

    public Worker getWorkerById(Long id) {
        return workerRepository.findById(id).orElseThrow(UserIsNotRegisteredAsWorkerException::new);
    }
}
