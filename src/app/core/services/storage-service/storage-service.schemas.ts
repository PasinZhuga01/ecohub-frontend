import { z } from 'zod';

export const schemas = {
	token: z.string().or(z.null()),
	isNavVisible: z.boolean()
};
