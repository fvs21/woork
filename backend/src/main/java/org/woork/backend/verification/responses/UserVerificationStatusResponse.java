package org.woork.backend.verification.responses;

import lombok.Getter;
import lombok.Setter;
import org.woork.backend.verification.VerificationStatus;

@Setter
@Getter
public class UserVerificationStatusResponse {
    VerificationStatus idPhotosStatus;
    VerificationStatus facePhotoStatus;

    public UserVerificationStatusResponse(VerificationStatus idPhotosStatus, VerificationStatus facePhotoStatus) {
        this.idPhotosStatus = idPhotosStatus;
        this.facePhotoStatus = facePhotoStatus;
    }
}
