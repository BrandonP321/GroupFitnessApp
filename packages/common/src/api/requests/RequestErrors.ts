export const RequestErrors = {
    /* CLIENT ERRORS */
    InvalidUserInput: "Barbell",
    InvalidUserCredentialInput: "Kettlebell",

    /* MONGOOSE ERRORS */
    UniqueFieldTaken: "Dumbbell",

    /* INTERNAL SERVER ERRORS */
    UnexpectedCondition: "Treadmill"
} as const;