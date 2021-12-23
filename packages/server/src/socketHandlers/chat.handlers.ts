import { ClientSocketEventResponse, ClientSocketEvents } from "@groupfitnessapp/common/src/api/webSocket";

export const HandleUserMsgSend = (data: ClientSocketEventResponse["UserMsgSend"]) => {
    console.log(data)
}