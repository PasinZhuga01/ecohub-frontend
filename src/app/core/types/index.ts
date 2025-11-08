export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type SuccessableObject<TSuccess extends object = object, TError extends object = object> =
	| ({ success: true } & TSuccess)
	| ({ success: false } & TError);
