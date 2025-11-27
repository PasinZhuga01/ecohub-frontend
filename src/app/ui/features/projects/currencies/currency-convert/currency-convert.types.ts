import { WritableSignal } from '@angular/core';

export type CurrencyConvertItemType = 'from' | 'to';

export type CurrencyConvertNullableItem = { iconSrc: string; rate: number } | null;
export type CurrencyConvertSelectedItems = Record<CurrencyConvertItemType, WritableSignal<CurrencyConvertNullableItem>>;
