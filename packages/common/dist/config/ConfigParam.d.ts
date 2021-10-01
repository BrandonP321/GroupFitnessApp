import { ConfigOverride } from "./ConfigOverride";
export declare type ValidConfigValue = string | boolean;
declare type ValidParamOverrides = "live" | "dev";
export interface IConfigParamParams {
    value: ValidConfigValue;
    enabled: boolean;
    description?: string;
    overrides?: {
        [key in ValidParamOverrides]?: ConfigOverride;
    };
}
interface IConfigParam extends IConfigParamParams {
}
export declare class ConfigParam implements IConfigParam {
    value: ValidConfigValue;
    enabled: boolean;
    readonly overrides: {
        live?: ConfigOverride | undefined;
        dev?: ConfigOverride | undefined;
    } | undefined;
    constructor(params: IConfigParamParams);
}
export {};
