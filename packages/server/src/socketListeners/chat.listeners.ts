import { ClientSocketEvents } from "@groupfitnessapp/common/src/api/webSocket";
import { Socket } from "socket.io";
import { HandleUserMsgSend } from "~SocketHandlers/chat.handlers";

export const listenForChatEvents = (socket: Socket) => {
    socket.on(ClientSocketEvents.UserMsgSend, HandleUserMsgSend)
}