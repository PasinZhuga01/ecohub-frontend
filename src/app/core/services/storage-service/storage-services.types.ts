import { z } from 'zod';

import { storageItems } from './storage-service.schemas';

export type StorageItems = z.input<typeof storageItems>;
