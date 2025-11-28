import { Code } from 'ecohub-shared/http/payloads';
import { inject, Injectable } from '@angular/core';
import { CurrencyCreateArgs, CurrencyService } from '@core/services';
import { AbortFlowError, createLookup, processFlow } from '@core/utils';

import { CurrencyCreateResult } from './currency-create.types';

@Injectable({
	providedIn: 'root'
})
export class CurrencyCreateService {
	private readonly _service = inject(CurrencyService);
	private readonly _getErrorText = createLookup<Code, string>(
		{ NAME_TAKEN: 'Валюта с таким названием уже существует' },
		'Неизвестная ошибка'
	);

	public create(args: CurrencyCreateArgs) {
		return processFlow<Promise<CurrencyCreateResult>>({
			onSuccess: async () => {
				await this._sendRequest(this._validateRequestArgs(args));

				return { success: true };
			},
			onError: async (error) => ({ success: false, message: error.message })
		});
	}

	public async uploadIcon() {
		return new Promise<string>((resolve) => {
			const input = document.createElement('input');

			input.type = 'file';
			input.accept = 'image/*';

			input.onchange = () => {
				const file = input.files?.[0];

				if (file === undefined) {
					return resolve('');
				}

				const reader = new FileReader();

				reader.onload = () => {
					if (typeof reader.result !== 'string') {
						return resolve('');
					}

					resolve(reader.result);
				};

				reader.readAsDataURL(file);
			};

			input.click();
		});
	}

	private _validateRequestArgs(args: CurrencyCreateArgs) {
		if (args.iconSrc === '') {
			throw new AbortFlowError('Значок валюты не был загружен');
		}

		if (args.name === '') {
			throw new AbortFlowError('Название валюты не было введено');
		}

		return args;
	}

	private async _sendRequest(args: CurrencyCreateArgs) {
		const response = await this._service.create(args);

		if (!response.success) {
			throw new AbortFlowError(this._getErrorText(response.code));
		}
	}
}
