import { z } from 'zod';

import { baseControlConfig } from './base-control.schemas';

export type BaseControlConfig = z.input<typeof baseControlConfig>;
