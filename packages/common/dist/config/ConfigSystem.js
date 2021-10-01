"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSystem = void 0;
var ConfigSystem = /** @class */ (function () {
    function ConfigSystem(params, subSystemsAndParams) {
        var _this = this;
        this.getSubSystemsAndParams = function () {
            var subSystems = [];
            var subParams = [];
            var subKeys = Object.keys(_this.subSystemsAndParams);
            for (var _i = 0, subKeys_1 = subKeys; _i < subKeys_1.length; _i++) {
                var key = subKeys_1[_i];
                var paramOrSystem = _this.subSystemsAndParams[key];
                if (paramOrSystem instanceof ConfigSystem) {
                    subSystems.push({ name: key, system: paramOrSystem });
                }
                else {
                    console.log(key, _this.enabled);
                    subParams.push({ name: key, param: paramOrSystem });
                }
            }
            return {
                systems: subSystems,
                params: subParams
            };
        };
        this.enabled = params.enabled;
        this.description = params.description;
        this.subSystemsAndParams = subSystemsAndParams;
    }
    return ConfigSystem;
}());
exports.ConfigSystem = ConfigSystem;
