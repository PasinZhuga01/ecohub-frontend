import { z } from 'zod';

export type ZodRawShapeFrom<T extends object> = { [K in keyof T]: z.ZodType<unknown, z.ZodTypeDef, T[K]> };

export type ZodObjectPick<T extends object, K extends keyof T> = z.ZodObject<
	ZodRawShapeFrom<T>,
	z.UnknownKeysParam,
	z.ZodTypeAny,
	Pick<T, K>,
	Pick<T, K>
>;
