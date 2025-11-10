import { inject, Injectable, Signal, signal } from '@angular/core';
import { ProfilesApi } from 'ecohub-shared/http/api';

import { HttpService } from '../http-service/http-service';
import { StorageService } from '../storage-service/storage-service';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	private readonly _login = signal<string | null>(null);

	private readonly _storage = inject(StorageService);
	private readonly _http: HttpService<ProfilesApi> = inject(HttpService);

	public get login(): Signal<string | null> {
		return this._login.asReadonly();
	}

	public async refresh(newToken?: string) {
		if (newToken !== undefined) {
			this._storage.setItem('token', newToken);
		}

		const result = await this._http.send('/profiles/get', 'GET', {});

		if (result.success) {
			this._login.set(result.response.login);
		}
	}
}
