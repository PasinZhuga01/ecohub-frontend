import { inject, Injectable } from '@angular/core';
import { CurrenciesApi } from 'ecohub-shared/http/api/projects';

import { HttpService } from '../http-service/http-service';
import { processHttpWithoutExtra } from '../helpers';
import { createCurrencyCreateFormData } from './currency-service.helpers';

import { CurrencyCreateArgs } from './currency-service.types';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService {
	private readonly _http: HttpService<CurrenciesApi> = inject(HttpService);

	public create(args: CurrencyCreateArgs) {
		return processHttpWithoutExtra({
			sendRequest: async () => this._http.send('/projects/currencies/create', 'POST', createCurrencyCreateFormData(args)),
			onSuccess: async () => {}
		});
	}
}
