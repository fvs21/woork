package org.woork.backend.verification;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import org.woork.backend.image.Image;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class VerificationData {
    @Id
    private Long userId;

    @OneToOne
    private Image facePhoto;

    @OneToOne
    private Image idPhotoFront;

    @OneToOne
    private Image idPhotoBack;

    private LocalDateTime identityVerifiedAt;

    private boolean identityVerificationFailed;

    @OneToOne
    private Image criminalRecords;

    private LocalDateTime criminalRecordsVerifiedAt;

    private boolean criminalRecordsVerificationFailed;

    public VerificationData() {}

    public VerificationData(Long userId) {
        this.userId = userId;
    }
}
