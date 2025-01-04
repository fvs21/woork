export type Host = {
    name: string;
    pfpUrl: string;
    username: string;
}

export type WorkerPendingJob = {
    jobId: number;
    host: Host;
    postingUrl: string;
    postingTitle: string;
    location_shared_at: string;
    completed_at: string;
    chatCreated: boolean;
    chatId?: number;
}