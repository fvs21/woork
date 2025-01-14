export type Status = "NOT_SUBMITTED" | "SUBMITTED" | "APPROVED" | "FAILED";

export type VerificationStatus = {
    facePhotoStatus: Status;
    idPhotosStatus: Status; 
}

export type WorkerVerificationStatus = {
    userVerificationStatus: VerificationStatus;
    criminalRecordsVerificationStatus: Status;
}