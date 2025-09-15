import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseApi, AbsoluteRoute, Request, Response } from 'ecohub-shared/schemas/api';

import { SuccessResult } from './types';

import env from '../../env';

@Injectable({
	providedIn: 'root'
})
export class HttpService<T extends BaseApi> {
	public constructor(private http: HttpClient) {}

	public async get<K extends keyof T['endpoints']>(
		url: AbsoluteRoute<T, K>,
		body: Request<T, K>
	): Promise<SuccessResult<Response<T, K>>> {
		return this.executeRequest(() => this.http.get(this.resolveUrl(url), { params: body }));
	}

	public async post<K extends keyof T['endpoints']>(
		url: AbsoluteRoute<T, K>,
		body: Request<T, K>
	): Promise<SuccessResult<Response<T, K>>> {
		return this.executeRequest(() => this.http.post(this.resolveUrl(url), body));
	}

	public async patch<K extends keyof T['endpoints']>(
		url: AbsoluteRoute<T, K>,
		body: Request<T, K>
	): Promise<SuccessResult<Response<T, K>>> {
		return this.executeRequest(() => this.http.patch(this.resolveUrl(url), body));
	}

	public async delete<K extends keyof T['endpoints']>(
		url: AbsoluteRoute<T, K>,
		body: Request<T, K>
	): Promise<SuccessResult<Response<T, K>>> {
		return this.executeRequest(() => this.http.delete(this.resolveUrl(url), { params: body }));
	}

	private resolveUrl<K extends keyof T['endpoints']>(url: AbsoluteRoute<T, K>): string {
		return new URL(url, env.serverUrl).toString();
	}

	private async executeRequest<T extends object>(sendRequest: () => Observable<T>): Promise<SuccessResult<T>> {
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
