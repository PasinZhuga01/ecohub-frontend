import { z } from 'zod';

export type ConfigSchema<T extends object> = {
	validators?: Partial<{ [K in keyof T]: z.ZodSchema<T[K]> }>;
	normalize?: (config: T) => T;
};
