import { z } from 'zod';
import { WritableSignal } from '@angular/core';

import { schemas } from './storage-service.schemas';

export type StorageSchemas = typeof schemas;

export type StorageItemValue<K extends keyof StorageSchemas> = z.output<StorageSchemas[K]>;
export type StorageItems = { [K in keyof StorageSchemas]: WritableSignal<StorageItemValue<K>> };
