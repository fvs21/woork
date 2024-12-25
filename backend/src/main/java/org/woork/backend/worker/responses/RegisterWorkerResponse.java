package org.woork.backend.worker.responses;

import org.woork.backend.user.resources.UserResource;
import org.woork.backend.worker.resources.WorkerResource;

public record RegisterWorkerResponse(
        UserResource user,
        WorkerResource worker
) {}
