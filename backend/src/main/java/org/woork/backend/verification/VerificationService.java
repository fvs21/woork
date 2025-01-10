package org.woork.backend.verification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.user.User;

@Service
public class VerificationService {
    private final VerificationRepository verificationRepository;
    private final ImageService imageService;

    @Autowired
    public VerificationService(VerificationRepository verificationRepository, ImageService imageService) {
        this.verificationRepository = verificationRepository;
        this.imageService = imageService;
    }

    //upload id (front and back photo)
    public void uploadIdPhotos(User user, MultipartFile idFrontImage, MultipartFile idBackImage) {
        Long userId = user.getId();
        VerificationData verificationData = verificationRepository.findByUserId(userId).orElse(new VerificationData());

        if(verificationData.getUserId() == null)
            verificationData.setUserId(userId);

        Image idFront = imageService.uploadImage(idFrontImage, "verification");
        Image idBack = imageService.uploadImage(idBackImage, "verification");

        verificationData.setIdPhotoFront(idFront);
        verificationData.setIdPhotoBack(idBack);
        verificationRepository.save(verificationData);
    }


    //upload face photo
    public void uploadFacePhoto(User user, MultipartFile facePhoto) {
        Long userId = user.getId();
        VerificationData verificationData = verificationRepository.findByUserId(userId).orElse(new VerificationData());

        if(verificationData.getUserId() == null)
            verificationData.setUserId(userId);

        Image faceImg = imageService.uploadImage(facePhoto, "verification");
        verificationData.setFacePhoto(faceImg);
        verificationRepository.save(verificationData);
    }

    //upload criminal records

}
