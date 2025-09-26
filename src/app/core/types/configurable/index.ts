import { ZodObjectFrom, ZodEffectsFrom } from '../zod';

export type ConfigSchema<T extends object> = ZodObjectFrom<T> | ZodEffectsFrom<T>;

export interface IConfigurable<T extends object> {
	config: T;
}
