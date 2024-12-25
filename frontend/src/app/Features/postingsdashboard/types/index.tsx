import { Worker } from "@/types/global"

export type AcceptJobApplicationResponse = {
    jobSession: HostPendingJob;
    jobSessionCount: number;
}

export type HostPendingJob = {
    jobId: number;
    worker: Worker;
    postingUrl: string;
    postingTitle: string;
    location_shared_at: string;
    completed_at: string;
}

export type AcceptApplicantRequest = {
    applicantId: number;
    postingId: string;
}