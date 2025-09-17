export type SuccessResult<T extends object> = { success: true; response: T } | { success: false; response: { code: unknown } };
