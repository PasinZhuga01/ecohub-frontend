import { z } from 'zod';

export type ConfigSchema<TConfig extends object> = {
	validators?: Partial<{ [K in keyof TConfig]: z.ZodSchema<TConfig[K]> }>;
	normalize?: (config: TConfig) => TConfig;
};
