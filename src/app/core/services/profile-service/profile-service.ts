import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { ProfilesApi, Request } from 'ecohub-shared/http/api';

import { HttpService } from '../http-service/http-service';
import { StorageService } from '../storage-service/storage-service';
import { RouterService } from '../router-service/router-service';
import { ProfileServiceHttpResult } from './profile-service.types';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	private readonly _isMenuVisible = signal<boolean>(false);
	private readonly _login = signal<string | null>(null);

	private readonly _storage = inject(StorageService);
	private readonly _router = inject(RouterService);
	private readonly _http: HttpService<ProfilesApi> = inject(HttpService);

	public constructor() {
		effect(() => this._refresh());
	}

	public get isMenuVisible(): Signal<boolean> {
		return this._isMenuVisible.asReadonly();
	}

	public get login(): Signal<string | null> {
		return this._login.asReadonly();
	}

	public async auth(data: Request<ProfilesApi, '/auth'>): Promise<ProfileServiceHttpResult> {
		const result = await this._http.send('/profiles/auth', 'POST', data);

		if (!result.success) {
			return { success: false, code: result.payload.code };
		}

		this._storage.token.set(result.response.token);
		this._router.goto('/');

		return { success: true };
	}

	public logout() {
		this._storage.token.set(null);
		this._router.goto('/');
	}

	public toggleMenuVisible() {
		if (this._storage.token() !== null) {
			this._isMenuVisible.update((value) => !value);
		}
	}

	private async _refresh() {
		if (this._storage.token() === null) {
			this._isMenuVisible.set(false);
			this._login.set(null);

			return;
		}

		const result = await this._http.send('/profiles/get', 'GET', {});
		const login = result.success ? result.response.login : null;

		this._login.set(login);
	}
}
