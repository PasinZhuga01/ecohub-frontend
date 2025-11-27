import z from 'zod';

export const currenciesParamsSchema = z
	.object({ id: z.string() })
	.refine(({ id }) => !isNaN(Number(id)))
	.transform(({ id }) => ({ id: Number(id) }));
