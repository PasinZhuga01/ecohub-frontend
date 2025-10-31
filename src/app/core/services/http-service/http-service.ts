import { firstValueFrom, Observable } from 'rxjs';
import { BaseApi, AbsoluteRoute, Request, Response } from 'ecohub-shared/schemas/api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import env from '@env';

import { SuccessResult } from './http-service.types';

@Injectable({
	providedIn: 'root'
})
export class HttpService<T extends BaseApi> {
	public constructor(private http: HttpClient) {}

	public async send<K extends keyof T['endpoints']>(
		url: AbsoluteRoute<T, K>,
		method: T['endpoints'][K]['method'],
		body: Request<T, K>
	): Promise<SuccessResult<Response<T, K>>> {
		return this._executeRequest(() => {
			const fullUrl = new URL(url, env.serverUrl).toString();

			switch (method) {
				case 'GET':
					return this.http.get(fullUrl, { params: body });
				case 'POST':
					return this.http.post(fullUrl, body);
				case 'PATCH':
					return this.http.patch(fullUrl, body);
				case 'DELETE':
					return this.http.delete(fullUrl, { params: body });
			}
		});
	}

	private async _executeRequest<T extends object>(sendRequest: () => Observable<T>): Promise<SuccessResult<T>> {
		try {
			return { success: true, response: await firstValueFrom<T>(sendRequest()) };
		} catch (error) {
			if (error instanceof HttpErrorResponse) {
				if (typeof error.error === 'object' && 'code' in error.error) {
					return { success: false, response: error.error };
				}
			}

			throw error;
		}
	}
}
