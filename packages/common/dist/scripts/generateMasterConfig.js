"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMasterConfig = void 0;
var Master_config_1 = require("../config/Master.config");
var fs_1 = __importDefault(require("fs"));
var generateMasterConfig = function () {
    var newMasterConfig = {};
    var helper = function (system, parentIsDisabled) {
        if (parentIsDisabled === void 0) { parentIsDisabled = false; }
        var currentSystem = system.system;
        // if parent system is disabled, disable current system
        if (parentIsDisabled) {
            currentSystem.enabled = false;
        }
        var isCurrentSystemDisabled = !currentSystem.enabled;
        var _a = currentSystem.getSubSystemsAndParams(), subSystems = _a.systems, subParams = _a.params;
        // recursively call helper function on any subsytems of current system
        for (var _i = 0, subSystems_1 = subSystems; _i < subSystems_1.length; _i++) {
            var sys = subSystems_1[_i];
            validateSystemOrParamName(sys.name, newMasterConfig);
            helper(sys, isCurrentSystemDisabled);
        }
        // new system object that will be added to final master config
        var newSystem = {
            enabled: currentSystem.enabled
        };
        // add each param to new system obj
        for (var _b = 0, subParams_1 = subParams; _b < subParams_1.length; _b++) {
            var _c = subParams_1[_b], name_1 = _c.name, param = _c.param;
            newSystem[name_1] = {
                value: param.value,
                // make sure param is disabled if parent system is disabled
                enabled: isCurrentSystemDisabled ? false : param.enabled
            };
        }
        // add new system to master config
        newMasterConfig[system.name] = newSystem;
    };
    helper({ name: "Master", system: Master_config_1.MasterConfigInstance });
    generateConfigJsonFile(newMasterConfig);
};
exports.generateMasterConfig = generateMasterConfig;
// throws an error in the console if a given string doesn't match the correct format or system name is already taken
var validateSystemOrParamName = function (name, currentMasterConfig) {
    var regex = /^[A-Z][A-Za-z]*$/;
    var isValidFormat = regex.test(name);
    if (!isValidFormat) {
        throw new Error("Master config System or Parameter '" + name + "' must only contain letters and start with an uppercase letter");
    }
    else if (currentMasterConfig[name]) {
        throw new Error("Master Config System name '" + name + "' is already being used");
    }
    return true;
};
// generates new JSON file in codegen folder
var generateConfigJsonFile = function (configObj) {
    var json = JSON.stringify(configObj);
    try {
        // write file to path relative to package.json
        fs_1.default.writeFileSync("./codegen/Master.config.json", json);
        console.log("Master config build successful");
    }
    catch (e) {
        throw new Error("Master config build not successful");
    }
};
(0, exports.generateMasterConfig)();
