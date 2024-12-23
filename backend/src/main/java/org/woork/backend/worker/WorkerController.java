package org.woork.backend.worker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.user.User;
import org.woork.backend.worker.responses.RegisterWorkerResponse;

@RestController
@RequestMapping("api/worker")
public class WorkerController {
    private final WorkerService workerService;
    private final AuthenticationService authenticationService;

    @Autowired
    public WorkerController(WorkerService workerService, AuthenticationService authenticationService) {
        this.workerService = workerService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public RegisterWorkerResponse registerAsWorker() {
        User user = authenticationService.getCurrentUser();

        return workerService.registerWorker(user);
    }
}
