import { ConfigParam } from "./ConfigParam";

interface IConfigSystemParams {
    enabled: boolean;
    description?: string;
}

interface ISubSystemAndParams {
    [key: string]: ConfigSystem | ConfigParam;
}

interface IConfigSystem extends IConfigSystemParams {
    subSystemsAndParams: ISubSystemAndParams;
}

export class ConfigSystem implements IConfigSystem {
    public enabled;
    public description;
    public subSystemsAndParams;

    constructor(params: IConfigSystemParams, subSystemsAndParams: ISubSystemAndParams) {
        this.enabled = params.enabled;
        this.description = params.description;
        this.subSystemsAndParams = subSystemsAndParams;
    }

    public getSubSystemsAndParams = () => {
        const subSystems: ConfigSystem[] = []
        const subParams: ConfigParam[] = []
        const subKeys = Object.keys(this.subSystemsAndParams);

        for (let key in subKeys) {
            const paramOrSystem = this.subSystemsAndParams[key];

            if (paramOrSystem instanceof ConfigSystem) {
                subSystems.push(paramOrSystem);
            } else {
                subParams.push(paramOrSystem);
            }
        }

        return {
            systems: subSystems,
            params: subParams
        }
    }
}