import { base64ToBlob } from '@core/utils';

import { CurrencyCreateArgs } from './currency-service.types';

export function createCurrencyCreateFormData(projectId: number, args: CurrencyCreateArgs) {
	const formData = new FormData();

	formData.append('projectId', String(projectId));
	formData.append('name', args.name);
	formData.append('rate', String(args.rate));
	formData.append('icon', base64ToBlob(args.iconSrc), 'image.png');

	return formData;
}
