import { z } from 'zod';

import { buttonControlConfig } from './button-control.schemas';

export type ButtonControlConfig = z.input<typeof buttonControlConfig>;
