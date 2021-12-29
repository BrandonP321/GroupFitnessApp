import { APIRequestResponse, ProtectedAPIRequest } from "@groupfitnessapp/common/src/api/requests"
import { GetUserChats } from "@groupfitnessapp/common/src/api/requests/user.requests"
import { GetUserChatsRequest } from "@groupfitnessapp/common/src/api/requests/user.types"
import { store } from "../src/features/store"
import { JWTUtils } from "./JWTUtils"
import { UserUtils } from "./UserUtils"

export class MobileAPIUtils {
    public static async makeProtectedAPICall<T extends APIRequestResponse>(request: ProtectedAPIRequest<T>, UrlParams: T["UrlParams"], bodyParams: T["ReqBody"]) {
        const accessToken = await JWTUtils.getAccessToken();

        const headers = {
            authorization: `Bearer ${accessToken}`,
        }

        return request(UrlParams, bodyParams, headers, UserUtils.haveUserReAuth, JWTUtils.getRefreshTokenFromStorage, JWTUtils.setBothTokens);
    }
}