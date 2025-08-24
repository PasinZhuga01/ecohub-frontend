import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

import { QueryParams, SuccessResult } from './types';

import env from '../../env';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	public constructor(private http: HttpClient) {}

	public async get<TReq extends QueryParams, TRes extends object>(url: string, body: TReq): Promise<SuccessResult<TRes>> {
		return this.executeRequest(() => this.http.get<TRes>(this.resolveUrl(url), { params: body }));
	}

	public async post<TReq extends object, TRes extends object>(url: string, body: TReq): Promise<SuccessResult<TRes>> {
		return this.executeRequest(() => this.http.post<TRes>(this.resolveUrl(url), body));
	}

	public async patch<TReq extends object, TRes extends object>(url: string, body: TReq): Promise<SuccessResult<TRes>> {
		return this.executeRequest(() => this.http.patch<TRes>(this.resolveUrl(url), body));
	}

	public async delete<TReq extends QueryParams, TRes extends object>(url: string, body: TReq): Promise<SuccessResult<TRes>> {
		return this.executeRequest(() => this.http.delete<TRes>(this.resolveUrl(url), { params: body }));
	}

	private resolveUrl(url: string): string {
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
