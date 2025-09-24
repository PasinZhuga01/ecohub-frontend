import { z } from 'zod';

import { baseControlConfig } from '../base-control/base-control.schemas';

export const textControlConfig = baseControlConfig
	.extend({
		limit: z.number().min(0).finite(),
		value: z.string().min(0),
		placeholder: z.string().min(0)
	})
	.transform((config) => {
		let { limit, value } = config;

		if (value.length > limit) {
			value = value.slice(0, limit);
		}

		return { ...config, value };
	});
