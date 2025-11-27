import { base64ToBlob } from '@core/utils';

import { CurrencyCreateArgs } from './currency-service.types';
import { WritableSignal } from '@angular/core';

export function createCurrencyCreateFormData(projectId: number, args: CurrencyCreateArgs) {
	const formData = new FormData();

	formData.append('projectId', String(projectId));
	formData.append('name', args.name);
	formData.append('rate', String(args.rate));
	formData.append('icon', base64ToBlob(args.iconSrc), 'image.png');

	return formData;
}

export function shiftItemsRate(items: WritableSignal<{ rate: number }[]>, value: number) {
	items.update((items) =>
		items.map((item) => {
			item.rate += value;

			return item;
		})
	);
}
