import { ValidConfigValue } from "./ConfigParam";
interface IConfigOverrideParams {
    value: ValidConfigValue;
    enabled: boolean;
}
export interface ValidOverrides {
}
export declare class ConfigOverride {
    readonly value: ValidConfigValue;
    readonly enabled: boolean;
    constructor(override: IConfigOverrideParams);
}
export {};
