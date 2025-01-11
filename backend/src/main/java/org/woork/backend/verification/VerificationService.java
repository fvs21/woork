package org.woork.backend.verification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.woork.backend.exceptions.exceptions.CannotUploadVerificationDataException;
import org.woork.backend.exceptions.exceptions.ValidationException;
import org.woork.backend.image.Image;
import org.woork.backend.image.ImageService;
import org.woork.backend.user.User;
import org.woork.backend.verification.responses.UserVerificationStatusResponse;
import org.woork.backend.verification.responses.WorkerVerificationStatusResponse;

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
        if(!idFrontImage.isEmpty() || !idBackImage.isEmpty()) {
            throw new ValidationException("Foto(s) de identificación faltante(s).");
        }

        Long userId = user.getId();
        VerificationData verificationData = verificationRepository.findByUserId(userId).orElse(new VerificationData());

        if(verificationData.getUserId() == null)
            verificationData.setUserId(userId);
        else if(verificationData.getIdPhotoBack() != null && verificationData.getIdPhotoFront() != null && !verificationData.isIdentityVerificationFailed())
            throw new CannotUploadVerificationDataException("Already uploaded ID photos. You need to wait for verification.");

        Image idFront = imageService.uploadPrivateImage(idFrontImage, "verification");
        Image idBack = imageService.uploadPrivateImage(idBackImage, "verification");

        verificationData.setIdPhotoFront(idFront);
        verificationData.setIdPhotoBack(idBack);
        verificationRepository.save(verificationData);
    }


    //upload face photo
    public void uploadFacePhoto(User user, MultipartFile facePhoto) {
        if(facePhoto.isEmpty()) {
            throw new ValidationException("Foto de cara faltante.");
        }

        Long userId = user.getId();
        VerificationData verificationData = verificationRepository.findByUserId(userId).orElse(new VerificationData());

        if(verificationData.getUserId() == null)
            verificationData.setUserId(userId);
        else if(verificationData.getFacePhoto() != null && !verificationData.isIdentityVerificationFailed())
            throw new CannotUploadVerificationDataException("Already uploaded face photo. You need to wait for verification.");

        Image faceImg = imageService.uploadPrivateImage(facePhoto, "verification");
        verificationData.setFacePhoto(faceImg);
        verificationRepository.save(verificationData);
    }

    //upload criminal records
    public void uploadCriminalRecords(User user, MultipartFile criminalRecordsPhoto) {
        if(criminalRecordsPhoto.isEmpty()) {
            throw new ValidationException("Carta de antecedentes penales faltante.");
        }

        Long userId = user.getId();
        VerificationData verificationData = verificationRepository.findByUserId(userId).orElse(new VerificationData());

        if(verificationData.getUserId() == null)
            verificationData.setUserId(userId);
        else if(verificationData.getCriminalRecords() != null && !verificationData.isCriminalRecordsVerificationFailed()) {
           throw new CannotUploadVerificationDataException("Already uploaded criminal records. You need to wait for verification.");
        }

        Image criminalRecords = imageService.uploadPrivateImage(criminalRecordsPhoto, "verification");
        verificationData.setCriminalRecords(criminalRecords);
        verificationRepository.save(verificationData);
    }

    public UserVerificationStatusResponse getUserVerificationStatus(User user) {
        VerificationData verificationData = verificationRepository.findByUserId(user.getId()).orElse(new VerificationData());

        if(verificationData.getUserId() == null) {
            return new UserVerificationStatusResponse(
                    VerificationStatus.NOT_SUBMITTED,
                    VerificationStatus.NOT_SUBMITTED
            );
        }

        if(verificationData.isIdentityVerificationFailed()) {
            return new UserVerificationStatusResponse(
                    VerificationStatus.FAILED,
                    VerificationStatus.FAILED
            );
        }

        if(verificationData.getIdentityVerifiedAt() != null) {
            return new UserVerificationStatusResponse(
                    VerificationStatus.APPROVED,
                    VerificationStatus.APPROVED
            );
        }

        return new UserVerificationStatusResponse(
                verificationData.getIdPhotoBack() != null ? VerificationStatus.SUBMITTED : VerificationStatus.NOT_SUBMITTED,
                verificationData.getFacePhoto() != null ? VerificationStatus.SUBMITTED : VerificationStatus.NOT_SUBMITTED
        );
    }

    public WorkerVerificationStatusResponse getWorkerVerificationStatus(User user) {
        VerificationData verificationData = verificationRepository.findByUserId(user.getId()).orElse(new VerificationData());
        UserVerificationStatusResponse userVerificationStatus = getUserVerificationStatus(user);

        if(verificationData.getUserId() == null) {
            return new WorkerVerificationStatusResponse(
                    userVerificationStatus,
                    VerificationStatus.NOT_SUBMITTED
            );
        }

        if(verificationData.isCriminalRecordsVerificationFailed()) {
            return new WorkerVerificationStatusResponse(
                    userVerificationStatus,
                    VerificationStatus.FAILED
            );
        }

        if(verificationData.getIdentityVerifiedAt() != null) {
            return new WorkerVerificationStatusResponse(
                    userVerificationStatus,
                    VerificationStatus.APPROVED
            );
        }

        return new WorkerVerificationStatusResponse(
                userVerificationStatus,
                verificationData.getCriminalRecords() != null ? VerificationStatus.SUBMITTED : VerificationStatus.NOT_SUBMITTED
        );
    }
}
