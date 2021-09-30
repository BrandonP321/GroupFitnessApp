import { webConfig } from "./systems/web.config";

interface IConfigParamOverrides {
    // live?: 
    // dev?: IConfigParamOverrides
}

interface IConfigSystemParam {

}

export interface IConfigSystem {
    overrides?: {
        // dev: 
    }
}

export const masterConfig = {
    test: "test config param"
}
