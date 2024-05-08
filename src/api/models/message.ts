export interface Message {
    id:         string;
    user_id:    string;
    message:    string;
    channel_id: string;
    createdAt:  Date;
}

export interface MessageRequest {
    user_id:    string;
    message:    string;
    channel_id: string;
}
