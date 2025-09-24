import { z } from 'zod';

import { textControlConfig } from './text-control.schemas';

export type TextControlConfig = z.input<typeof textControlConfig>;
