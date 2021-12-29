import { storeAccessToken } from "../src/features/user/userSlice";
import { store } from "../src/features/store";
import { StorageUtils } from "./StorageUtils";

export class JWTUtils {
    public static async getAccessToken() {
        try {
            const token = store.getState()?.user?.accessToken

            return token
        } catch (err) {
            return undefined;
        }
    }

    public static async getRefreshTokenFromStorage() {
        const token = await StorageUtils.getSecureItemAsync("refreshToken");

        return token;
    }

    /* securely stores refresh token in storage */
    public storeRefreshToken() {

    }

    private static storeToken() {

    }

    private static getTokenFromStorage() {

    }

    /* stores both the access and refresh token */
    public static async setBothTokens(accessToken: string, refreshToken: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                // store both tokens in async storage
                const setAccessToken = await StorageUtils.setSecureItemAsync("accessToken", accessToken);
                const setRefreshToken = await StorageUtils.setSecureItemAsync("refreshToken", refreshToken);
    
                if (!setAccessToken || !setRefreshToken) {
                    return reject(false);
                }
        
                // store access token in redux store
                store.dispatch(storeAccessToken(accessToken))

                return resolve(true);
            } catch (err) {

                return reject(false);
            }
        })
    }
}