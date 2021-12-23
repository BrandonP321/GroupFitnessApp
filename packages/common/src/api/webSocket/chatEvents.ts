/* Events sent from client to server */
export const ClientSocketEvents = {
    UserMsgSend: "UserMsgSend"
} as const;

export type ClientSocketEventResponse = {
    [ClientSocketEvents.UserMsgSend]: {
        senderId: string;
        msg: string;
    }
}

/* Events sent from server to client */
export const ServerSocketEvents = {
    /* Server has received a msg and is sending it back to all users in that chat */
    MsgReceived: "MsgReceived"
} as const;

export type ServerSocketEventReponse = {
    [ServerSocketEvents.MsgReceived]: {
        senderId: string;
        msg: string;
    }
}