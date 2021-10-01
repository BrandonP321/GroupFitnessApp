import { ValidConfigValue } from "../config/ConfigParam";
import { ConfigSystem as System } from "../config/ConfigSystem";
import { MasterConfigInstance } from "../config/Master.config";
import fs from "fs"

interface MasterConfigParam {
    value: ValidConfigValue;
    enabled: boolean;
}

interface MasterConfigSystem {
    enabled: boolean;
    [key: string]: MasterConfigParam | boolean
}

export const generateMasterConfig = () => {
    const newMasterConfig: { [key: string]: MasterConfigSystem } = {}

    const helper = (system: { name: string; system: System }, parentIsDisabled: boolean = false) => {
        const currentSystem = system.system;

        // if parent system is disabled, disable current system
        if (parentIsDisabled) {
            currentSystem.enabled = false
        }

        const isCurrentSystemDisabled = !currentSystem.enabled
        const { systems: subSystems, params: subParams } = currentSystem.getSubSystemsAndParams();

        // recursively call helper function on any subsytems of current system
        for (let sys of subSystems) {
            validateSystemOrParamName(sys.name, newMasterConfig);
            helper(sys, isCurrentSystemDisabled);
        }

        interface INewSystem {
            enabled: boolean;
            [key: string]: {
                value: ValidConfigValue,
                enabled: boolean;
            } | boolean;
        }

        // new system object that will be added to final master config
        const newSystem: INewSystem = {
            enabled: currentSystem.enabled
        }

        // add each param to new system obj
        for (let { name, param } of subParams) {
            newSystem[name] = {
                value: param.value,
                // make sure param is disabled if parent system is disabled
                enabled: isCurrentSystemDisabled ? false : param.enabled
            };
        }

        // add new system to master config
        newMasterConfig[system.name] = newSystem;
    }

    helper({ name: "Master", system: MasterConfigInstance })

    generateConfigJsonFile(newMasterConfig)
}

// throws an error in the console if a given string doesn't match the correct format or system name is already taken
const validateSystemOrParamName = (name: string, currentMasterConfig: { [key: string]: any }) => {
    const regex = /^[A-Z][A-Za-z]*$/;
    const isValidFormat = regex.test(name);

    if (!isValidFormat) {
        throw new Error(`Master config System or Parameter \'${name}\' must only contain letters and start with an uppercase letter`);
    } else if (currentMasterConfig[name]) {
        throw new Error(`Master Config System name \'${name}\' is already being used`);
    }

    return true;
}

// generates new JSON file in codegen folder
const generateConfigJsonFile = (configObj: { [key: string]: any }) => {
    const json = JSON.stringify(configObj);
    try {
        // write file to path relative to package.json
        fs.writeFileSync("./codegen/Master.config.json", json)
        console.log("Master config build successful");
    } catch (e) {
        throw new Error("Master config build not successful");
    }
}

generateMasterConfig();