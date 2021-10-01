import { ValidConfigValue } from "./ConfigParam";

interface IConfigOverrideParams {
    value: ValidConfigValue;
    enabled: boolean;
}

export interface ValidOverrides {
    
}

export class ConfigOverride {
    public readonly value: ValidConfigValue;
    public readonly enabled: boolean;

    constructor(override: IConfigOverrideParams) {
        this.value = override.value;
        this.enabled = override.enabled;
    }
}