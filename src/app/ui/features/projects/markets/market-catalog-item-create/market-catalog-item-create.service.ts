import { inject, Injectable } from '@angular/core';
import { CatalogItemService, CatalogItemCreateArgs } from '@core/services';
import { AbortFlowError, createLookup, processFlow } from '@core/utils';
import { Code } from 'ecohub-shared/http/payloads';

import { MarketCatalogItemCreateResult } from './market-catalog-item-create.types';

@Injectable({
	providedIn: 'root'
})
export class MarketCatalogItemCreateService {
	private readonly _service = inject(CatalogItemService);
	private readonly _getErrorText = createLookup<Code, string>(
		{ NAME_TAKEN: 'Товар с таким названием уже существует' },
		'Неизвестная ошибка'
	);

	public async create(args: CatalogItemCreateArgs) {
		return processFlow<Promise<MarketCatalogItemCreateResult>>({
			onSuccess: async () => {
				await this._sendRequest(this._validateRequestArgs(args));

				return { success: true };
			},
			onError: async (error) => ({ success: false, message: error.message })
		});
	}

	private _validateRequestArgs(args: CatalogItemCreateArgs) {
		if (args.name === '') {
			throw new AbortFlowError('Название товара не было введено');
		}

		return args;
	}

	private async _sendRequest(args: CatalogItemCreateArgs) {
		const response = await this._service.create(args);

		if (!response.success) {
			throw new AbortFlowError(this._getErrorText(response.code));
		}
	}
}
