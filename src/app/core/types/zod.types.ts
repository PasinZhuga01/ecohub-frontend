import { z } from 'zod';

export type ZodObjectPick<T extends object, K extends keyof T> = z.ZodObject<
	Record<K, z.ZodTypeAny>,
	z.UnknownKeysParam,
	z.ZodTypeAny,
	Pick<T, K>,
	Pick<T, K>
>;
