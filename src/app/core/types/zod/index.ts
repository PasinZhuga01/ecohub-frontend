import { z } from 'zod';

export type ZodRawShapeFrom<T extends object> = { [K in keyof T]: z.ZodType<unknown, z.ZodTypeDef, T[K]> };
export type ZodObjectFrom<T extends object> = z.ZodObject<ZodRawShapeFrom<T>>;
export type ZodEffectsFrom<T extends object, O extends unknown = T> = z.ZodEffects<ZodObjectFrom<T>, O>;
export type ZodObjectPick<T extends object, K extends keyof T> = z.ZodObject<
	ZodRawShapeFrom<T>,
	z.UnknownKeysParam,
	z.ZodTypeAny,
	Pick<T, K>,
	Pick<T, K>
>;
