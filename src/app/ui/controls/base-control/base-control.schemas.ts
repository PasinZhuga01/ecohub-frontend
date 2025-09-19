import { z } from 'zod';

export const baseControlConfig = z.object({
	name: z.string().max(75).optional()
});

export type BaseControlConfig = z.input<typeof baseControlConfig>;
