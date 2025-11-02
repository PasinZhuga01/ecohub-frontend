export type SuccessResult<TBody extends object> = { success: true; response: TBody } | { success: false; response: { code: unknown } };
