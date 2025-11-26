import { base64ToBlob } from '@core/utils';

import { CurrencyCreateArgs } from './currency-service.types';

export function createCurrencyCreateFormData({ projectId, name, rate, iconSrc }: CurrencyCreateArgs) {
	const formData = new FormData();

	formData.append('projectId', String(projectId));
	formData.append('name', name);
	formData.append('rate', String(rate));
	formData.append('icon', base64ToBlob(iconSrc), 'image.png');

	return formData;
}
