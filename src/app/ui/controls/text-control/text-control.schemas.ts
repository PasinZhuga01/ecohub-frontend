import { z } from 'zod';
import { ConfigSchema } from '@core/types';

import { TextControlConfig } from './text-control.types';

export const textControlConfigSchema: ConfigSchema<TextControlConfig> = {
	validators: {
		limit: z.number().min(0).finite()
	},
	normalize: ({ limit, value, ...config }) => {
		if (value.length > limit) {
			value = value.slice(0, limit);
		}

		return { ...config, limit, value };
	}
};
