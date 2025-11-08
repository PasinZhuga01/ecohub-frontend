import { Injectable } from '@angular/core';

import { storageItems } from './storage-service.schemas';
import { StorageItems } from './storage-services.types';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	private readonly _defaultItems: StorageItems = { token: null, isNavVisible: false, expandedNavItems: {} };

	public constructor() {
		this._validate();
	}

	public hasItem<K extends keyof StorageItems>(name: K): boolean {
		return name in localStorage;
	}

	public getItem<K extends keyof StorageItems>(name: K): StorageItems[K] {
		if (!this.hasItem(name)) {
			this.setItem(name, this._defaultItems[name]);
		}

		return JSON.parse(localStorage.getItem(name)!);
	}

	public setItem<K extends keyof StorageItems>(name: K, value: StorageItems[K]) {
		localStorage.setItem(name, JSON.stringify(value));
	}

	private _validate() {
		for (const nameTSUntyped in this._defaultItems) {
			const name = nameTSUntyped as keyof StorageItems;

			if (!this.hasItem(name) || !storageItems.shape[name].safeParse(this.getItem(name)).success) {
				this.setItem(name, this._defaultItems[name]);
			}
		}
	}
}
