import { z } from 'zod';

/* config */

export type ConfigSchema<TConfig extends object> = {
	validators?: Partial<{ [K in keyof TConfig]: z.ZodSchema<TConfig[K]> }>;
	normalize?: (config: TConfig) => TConfig;
};

/* utils */

export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type SuccessableObject<TSuccess extends object, TError extends object> =
	| ({ success: true } & TSuccess)
	| ({ success: false } & TError);
