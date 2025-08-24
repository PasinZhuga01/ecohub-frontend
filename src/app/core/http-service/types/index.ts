export type QueryParams = Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
export type SuccessResult<T extends object> = { success: true; response: T } | { success: false; response: { code: unknown } };
