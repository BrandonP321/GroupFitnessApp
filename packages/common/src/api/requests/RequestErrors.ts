export const RequestErrors = {
    /* CLIENT ERRORS */
    InvalidUserInput: "Barbell",
    InvalidUserCredentialInput: "Kettlebell",
    InvalidUserCredentials: "EZ-Bar",
    OneOrMoreInvalidUserIds: "Spotter",
    InvalidId: "Cables",
    UserAlreadyInChat: "Superset",
    ChatIsGroupChat: "Eliptical",

    /* MONGOOSE ERRORS */
    UniqueFieldTaken: "Dumbbell",

    /* SERVER ERRORS */
    UnexpectedCondition: "Treadmill",
    // a fatal error has occurred that was caught at the very top level of an api route
    APIRouteFailure: "Burpee",
    ExpiredAccessToken: "Stubbed Toe",
    UserMustReAuth: "Broken Toe"
} as const;