import { z } from 'zod';
import { ConfigSchema } from '@core/types';

import { NumberControlConfig } from './number-control.types';

export const numberControlConfigSchema: ConfigSchema<NumberControlConfig> = {
	validators: {
		step: z.number().finite(),
		min: z.number().finite(),
		max: z.number().finite(),
		value: z.number().finite()
	},
	normalize: ({ min, max, value, ...config }) => {
		if (min > max) {
			[min, max] = [max, min];
		}

		if (value < min) {
			value = min;
		} else if (value > max) {
			value = max;
		}

		return { ...config, min, max, value };
	}
};
