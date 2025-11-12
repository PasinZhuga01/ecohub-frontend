import { z } from 'zod';

export const schemas = {
	token: z.string().or(z.null()),
	isNavVisible: z.boolean(),
	expandedNavItems: z.record(
		z.number(),
		z
			.object({
				isMarketsExpanded: z.literal(true)
			})
			.or(z.object({}))
	)
};
