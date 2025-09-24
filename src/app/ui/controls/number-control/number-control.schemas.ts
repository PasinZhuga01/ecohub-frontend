import { z } from 'zod';

import { baseControlConfig } from '../base-control/base-control.schemas';

export const numberControlConfig = baseControlConfig
	.extend({
		isStepperable: z.boolean(),
		step: z.number().finite(),
		scale: z.number().min(0).max(100),
		min: z.number().finite(),
		max: z.number().finite(),
		value: z.number().finite()
	})
	.transform((config) => {
		let { min, max, value } = config;

		if (min > max) {
			[min, max] = [max, min];
		}

		if (value < min) {
			value = min;
		} else if (value > max) {
			value = max;
		}

		return { ...config, min, max, value };
	});
