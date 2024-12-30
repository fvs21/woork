export type MessagesListRecipient = {
    chatUser: Participant;
    lastMessage: Message;
    messagesUnread: number;
    chatId: number;
}

export type Message = {
    sender: Participant;
    content: string;
    readAt: string | null;
    sentAt: string;
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
    createdAt: string;
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

//type that represents a websocket message event
//the new_chat and new_message returns a Message type
//the chat_read only returns the chat_id from which the event was triggered
export type MessageEvent = {
    eventType: 'new_chat' | 'new_message' | 'chat_read';
    eventPayload: Message | number;
}