import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { listenForChatEvents } from "~SocketListeners/chat.listeners";

export const configureSocket = (server: httpServer) => {
    const io = new Server(server, {});

    io.on("connection", (socket) => {
        console.log("socket connected");
        
        listenForChatEvents(socket);
    });
}