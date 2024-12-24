package org.woork.backend.pendingjob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.pendingjob.resources.HostPendingJobResource;
import org.woork.backend.user.User;

import java.util.List;

@RestController
@RequestMapping("api/pending_jobs")
public class PendingJobController {
    private final AuthenticationService authenticationService;
    private PendingJobService pendingJobService;

    @Autowired
    public PendingJobController(PendingJobService pendingJobService, AuthenticationService authenticationService) {
        this.pendingJobService = pendingJobService;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public List<HostPendingJobResource> getUserPendingJobs() {
        User user = authenticationService.getCurrentUser();


    }
}
