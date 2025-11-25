import { z } from 'zod';

export const projectParamsSchema = z
	.object({ id: z.string() })
	.refine(({ id }) => !isNaN(Number(id)))
	.transform(({ id }) => ({ id: Number(id) }));
