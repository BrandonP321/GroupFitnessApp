/**
 * All systems found in master config.  Used for accessing parameters in each system
 */
export const SystemNames = {

} as const;

export type ValidSystemName = keyof typeof SystemNames;