import { Routes, ValidRoute } from "../api/routes";

export class APIUtils {
    public static getApiDomain = () => {
        // TODO: update this return value with value from config or env
        // return "http://localhost:8000";
        return "http://10.0.0.172:8000";
    }
}