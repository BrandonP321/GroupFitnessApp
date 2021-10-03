import { ConfigSystem as System } from "../ConfigSystem";
import { ConfigParam as Param } from "../ConfigParam";

export const ServerConfig = new System({ enabled: true, description: "Settings for back end server, makes entire API inaccessible if disabled" }, {
    ConnectionSettings: new System({ enabled: true, description: "Settings for connecting mobile & web clients to API" }, {
        ClientAPIUrlString: new Param({ enabled: true, value: "asdf", overrides: {
            live: { enabled: true, value: "" },
            stage: { enabled: true, value: "" },
            dev: { enabled: true, value: "" },
            local: { enabled: true, value: "http://localhost:8000" },
        }})
    })
})