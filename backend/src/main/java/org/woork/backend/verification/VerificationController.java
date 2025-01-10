package org.woork.backend.verification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.authentication.AuthenticationService;
import org.woork.backend.user.User;

@RestController
@RequestMapping("api/verification")
public class VerificationController {
    private final VerificationService verificationService;
    private final AuthenticationService authenticationService;

    @Autowired
    public VerificationController(VerificationService verificationService, AuthenticationService authenticationService) {
        this.verificationService = verificationService;
        this.authenticationService = authenticationService;
    }

    @PostMapping(value = "/id", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadId(
            @RequestPart("id_front") MultipartFile idFront, // image of the front of the id
            @RequestPart("id_back") MultipartFile idBack // image of back of the id
    ) {
        User user = authenticationService.getCurrentUser();
        verificationService.uploadIdPhotos(user, idFront, idBack);
        return "Uploaded";
    }


}
