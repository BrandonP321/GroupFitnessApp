import findup from "findup-sync";

const SharedEnvVars = {
    API_URL: "API_URL",
    ENV: "ENV",
} as const;

const NodeServerEnvVars = {
    PORT: "PORT",
    MONGODB_URI: "MONGODB_URI",
    "SECRET": "SECRET",
} as const;

const WebClientEnvVars = {

} as const;

const MobileClientEnvVars = {

} as const

export const EnvVars = {
    ...SharedEnvVars,
    ...NodeServerEnvVars,
    ...WebClientEnvVars,
    ...MobileClientEnvVars
} as const;

type ValidEnvVar = keyof typeof EnvVars;

export class EnvUtils {
    /* returns value of an evironment variable or a default value if variable doesn't exist */
    public static getEnvVar(v: ValidEnvVar, defaultValue?: string | number) {
        return process.env[v] ?? defaultValue
    }

    /* returns path of nearest .env file */
    public static getEnvFilePath = () => {
        return findup(".env");
    }

    /* returns current environment site is running in (i.e. local, live, etc.) */
    public static getCurrentEnvironment = () => {
        return EnvUtils.getEnvVar(EnvVars.ENV);
    }
}