export type Notification = {
    read: boolean;
    id: number;
    createdAt: string;
    type: "JOB_APPLICATION" | "NEW_MESSAGE" | "ACCEPTED_APPLICATION"
    payload: PostingApplicationPayload | NewMessagePayload
}

export type PostingApplicationPayload = {
    applicantName: string;
    applicantProfileUrl: string;
    postingTitle: string;
    postingLink: string;
}

export type NewMessagePayload = {
    senderName: string;
    senderProfileUrl: string;
    chatId: number;
}