export const Areas = {
    Example: "Example"
} as const;

export type validArea = keyof typeof Areas;