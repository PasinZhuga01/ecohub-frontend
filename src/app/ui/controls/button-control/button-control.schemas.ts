import { z } from 'zod';

import { baseControlConfig } from '../base-control/base-control.schemas';

export const buttonControlConfig = baseControlConfig.extend({
	isHighlighted: z.boolean(),
	isSubmit: z.boolean(),
	value: z.string().min(1).max(75)
});
