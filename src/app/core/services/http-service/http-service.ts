import { firstValueFrom, Observable } from 'rxjs';
import { BaseApi, AbsoluteRoute, Request, Response } from 'ecohub-shared/http/api';
import { codes } from 'ecohub-shared/http/payloads';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import env from '@env';

import { SuccessResult } from './http-service.types';
import z from 'zod';

@Injectable({
	providedIn: 'root'
})
export class HttpService<TApi extends BaseApi> {
	private readonly _payloadSchema = z.object({ code: z.enum(Object.keys(codes) as [keyof typeof codes, ...(keyof typeof codes)[]]) });

	public constructor(private readonly _http: HttpClient) {}

	public async send<TRoute extends keyof TApi['endpoints']>(
		url: AbsoluteRoute<TApi, TRoute>,
		method: TApi['endpoints'][TRoute]['method'],
		body: Request<TApi, TRoute>
	): Promise<SuccessResult<Response<TApi, TRoute>>> {
		return this._executeRequest(() => {
			const fullUrl = new URL(url, env.serverUrl).toString();

			switch (method) {
				case 'GET':
					return this._http.get(fullUrl, { params: body });
				case 'POST':
					return this._http.post(fullUrl, body);
				case 'PATCH':
					return this._http.patch(fullUrl, body);
				case 'DELETE':
					return this._http.delete(fullUrl, { params: body });
			}
		});
	}

	private async _executeRequest<TBody extends object>(sendRequest: () => Observable<TBody>): Promise<SuccessResult<TBody>> {
		try {
			return { success: true, response: await firstValueFrom<TBody>(sendRequest()) };
		} catch (error) {
			if (error instanceof HttpErrorResponse) {
				const { success, data } = this._payloadSchema.safeParse(error.error);

				if (success) {
					return { success: false, response: data };
				}
			}

			throw error;
		}
	}
}
