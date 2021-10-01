"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParam = void 0;
var ConfigParam = /** @class */ (function () {
    function ConfigParam(params) {
        this.value = params.value;
        this.enabled = params.enabled;
        this.overrides = params.overrides;
    }
    return ConfigParam;
}());
exports.ConfigParam = ConfigParam;
