/* All route names except those for area routes */
export const RouteNames = {
    Example: "Example"
} as const;

export type validRouteName = keyof typeof RouteNames;