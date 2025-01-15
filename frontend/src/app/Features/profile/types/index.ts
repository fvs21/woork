export type TimeInPlatform = {
    time: number;
    units: string;
}

export type PublicProfile = {
    firstName: string;
    about: string;
    phoneVerified: boolean;
    emailVerified: boolean;
    identityVerified: boolean;
    pfp_url: string;
    timeInPlatform: TimeInPlatform;
    is_worker: boolean;
}

export type PublicWorkerProfile = PublicProfile & {
    categories: string[];
    jobsCompleted: number;
}