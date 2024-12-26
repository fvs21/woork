export type MessagesListRecipient = {
    chatUser: Participant;
    lastMessage: Message;
    messagesUnread: number;
}

export type Message = {
    sender: Participant;
    content: string;
    readAt: Date | null;
    sentAt: Date;
    type: 'text' | 'image' | 'video';
}

export type Participant = {
    name: string;
    pfpUrl: string;
    id: number; // or username
}

export type Chat = {
    participants: Array<Participant>;
    createdAt: Date;
    messages: Array<Message>;
    id: number;
}