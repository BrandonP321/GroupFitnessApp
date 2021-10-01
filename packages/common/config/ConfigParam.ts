import { ConfigOverride } from "./ConfigOverride";

export type ValidConfigValue = string | boolean;
type ValidParamOverrides = "live" | "dev";

interface IConfigParamParams {
    value: ValidConfigValue;
    enabled: boolean;
    description?: string;
    overrides?: { [key in ValidParamOverrides]?: ConfigOverride };
}

interface IConfigParam extends IConfigParamParams {
}

export class ConfigParam implements IConfigParam {
    public value;
    public enabled;
    public readonly overrides;

    constructor(params: IConfigParamParams) {
        this.value = params.value;
        this.enabled = params.enabled;
        this.overrides = params.overrides;
    }
}