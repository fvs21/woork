export type MessagesListRecipient = {
    chatUser: Participant;
    lastMessage: Message;
    messagesUnread: number;
    chatId: number;
}

export type Message = {
    sender: Participant;
    content: string;
    readAt: Date | null;
    sentAt: Date;
    type: 'text' | 'image';
    chatId: number;
}

export type Participant = {
    name: string;
    pfpUrl: string;
    username: string;
}

export type Chat = {
    participants: Array<Participant>;
    createdAt: Date;
    messages: Array<Message>;
    id: number;
}

export type SelectedChat = {
    chatId?: number;
    recipient: Participant;
    create: boolean;
}

export type MessagePayload = {
    receiver: string;
    content: string;
    type: 'TEXT' | 'IMAGE';
}