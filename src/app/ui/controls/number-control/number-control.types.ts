import { z } from 'zod';

import { numberControlConfig } from './number-control.schemas';

export type NumberControlConfig = z.input<typeof numberControlConfig>;
