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
    postingDescription: string;
    location: Coordinates; //this could either be display coordinates or the actual posting coordinates
    location_shared_at: string | null;
    completed_at: string | null;
    chatCreated: boolean;
    chatId?: number;
}

export type Coordinates = {
    latitude: number;
    longitude: number;
}