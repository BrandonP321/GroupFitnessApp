import { ConfigSystem as System } from "./ConfigSystem";
import { ConfigParam as Param } from "./ConfigParam";

const testConfig = new System({ enabled: true, description: "" }, {
    systemOne: new System({ enabled: true, description: "" }, {
        firstNestedParam: new Param({ enabled: true, value: "test value", overrides: {
            live: { enabled: true, value: false }
        }})
    }),
    paramOne: new Param({ enabled: true, value: "1 layer deep param value", description: "" })
})

export const masterConfig = {
    ...testConfig
}

const generateMasterConfig = () => {

    // 
    const helper = () => {

    }
}

const example = {
    // system => web
    web: {
        enabled: true,
        description: "This is some description of this system",
        // system param => domain
        domain: {
            value: "https://google.com",
            enabled: true,
            description: "Param description",
            // param environment overrides
            overrides: {
                // param override (doesn't allow for a nested override)
                live: {
                    value: "https://test.com",
                    enabled: true
                },
                dev: {
                    value: "https://amazon.com",
                    enabled: true
                }
            }
        },
        // param => apiKey
        apiKey: {
            value: "asdfeoijasdf",
            enabled: true
        }
    }
}