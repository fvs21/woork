package org.woork.backend.verification;

import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.user.User;
import org.woork.backend.validators.ValidatorImpl;
import org.woork.backend.verification.responses.UserVerificationStatusResponse;
import org.woork.backend.verification.responses.WorkerVerificationStatusResponse;

@RestController
@RequestMapping("api/verification")
public class VerificationController {
    private final VerificationService verificationService;
    private final AuthenticationService authenticationService;
    private final ValidatorImpl validatorImpl;

    @Autowired
    public VerificationController(VerificationService verificationService, AuthenticationService authenticationService, ValidatorImpl validatorImpl) {
        this.verificationService = verificationService;
        this.authenticationService = authenticationService;
        this.validatorImpl = validatorImpl;
    }

    @PostMapping(value = "/id", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadIdPhotos(
            @RequestPart("id_front")
            @NotNull(message = "Foto de identificación faltante.")
            MultipartFile idFront, // image of the front of the id

            @RequestPart("id_back")
            @NotNull(message = "Foto de identificación trasera.")
            MultipartFile idBack // image of back of the id
    ) {
        User user = authenticationService.getCurrentUser();
        verificationService.uploadIdPhotos(user, idFront, idBack);
        return "Uploaded";
    }

    @PostMapping(value = "/face", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadFacePhoto(
            @RequestPart("face") MultipartFile facePhoto
    ) {
        User user = authenticationService.getCurrentUser();
        verificationService.uploadFacePhoto(user, facePhoto);
        return "Uploaded";
    }

    @PostMapping(value = "/criminal-records", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadCriminalRecords(
            @RequestPart("criminalRecords") MultipartFile criminalRecordsPhoto
    ) {
        User user = authenticationService.getCurrentUser();
        verificationService.uploadCriminalRecords(user, criminalRecordsPhoto);
        return "Uploaded";
    }

    @GetMapping(value = "/status")
    public UserVerificationStatusResponse getVerificationStatus() {
        User user = authenticationService.getCurrentUser();
        return verificationService.getUserVerificationStatus(user);
    }

    @GetMapping(value = "/worker/status")
    public WorkerVerificationStatusResponse getWorkerVerificationStatus() {
        User user = authenticationService.getCurrentUser();
        return verificationService.getWorkerVerificationStatus(user);
    }
}
