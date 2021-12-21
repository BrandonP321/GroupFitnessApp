export const RequestErrors = {
    /* CLIENT ERRORS */
    InvalidUserInput: "Barbell",
    InvalidUserCredentialInput: "Kettlebell",
    OneOrMoreInvalidUserIds: "Spotter",

    /* MONGOOSE ERRORS */
    UniqueFieldTaken: "Dumbbell",

    /* SERVER ERRORS */
    UnexpectedCondition: "Treadmill",
    // a fatal error has occurred that was caught at the very top level of an api route
    APIRouteFailure: "Burpee",
} as const;