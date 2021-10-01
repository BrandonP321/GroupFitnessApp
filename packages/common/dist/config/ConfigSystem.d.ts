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
export declare class ConfigSystem implements IConfigSystem {
    enabled: boolean;
    description: string | undefined;
    subSystemsAndParams: ISubSystemAndParams;
    constructor(params: IConfigSystemParams, subSystemsAndParams: ISubSystemAndParams);
    getSubSystemsAndParams: () => {
        systems: {
            name: string;
            system: ConfigSystem;
        }[];
        params: {
            name: string;
            param: ConfigParam;
        }[];
    };
}
export {};
