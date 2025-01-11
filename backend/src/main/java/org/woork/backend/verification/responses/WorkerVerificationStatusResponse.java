package org.woork.backend.verification.responses;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.verification.VerificationStatus;

@Getter
@Setter
public class WorkerVerificationStatusResponse {
    private UserVerificationStatusResponse userVerificationStatus;
    private VerificationStatus criminalRecordsVerificationStatus;

    public WorkerVerificationStatusResponse(UserVerificationStatusResponse userVerificationStatus, VerificationStatus criminalRecordsVerificationStatus) {
        this.userVerificationStatus = userVerificationStatus;
        this.criminalRecordsVerificationStatus = criminalRecordsVerificationStatus;
    }
}
