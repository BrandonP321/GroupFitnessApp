"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterConfigInstance = void 0;
var ConfigSystem_1 = require("./ConfigSystem");
var Web_config_1 = require("./systems/Web.config");
exports.MasterConfigInstance = new ConfigSystem_1.ConfigSystem({ enabled: true, description: "Master config wrapper for all other config systems & parameters" }, {
    WebConfig: Web_config_1.WebConfig,
});
