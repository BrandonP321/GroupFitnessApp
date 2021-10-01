import { ConfigSystem as System } from "./ConfigSystem";
import { WebConfig } from "./systems/Web.config";

export const MasterConfigInstance = new System({ enabled: true, description: "Master config wrapper for all other config systems & parameters" }, {
    WebConfig,
})