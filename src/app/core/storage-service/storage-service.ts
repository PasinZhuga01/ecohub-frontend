import { Injectable } from '@angular/core';

import { storageItems, StorageItems } from './storage-service.schemas';
import { StorageError } from './storage-service.errors';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	public constructor() {
		this.validate({ token: null, isNavVisible: false, expandedNavItems: {} });
	}

	public hasItem<K extends keyof StorageItems>(name: K): boolean {
		return name in localStorage;
	}

	public getItem<K extends keyof StorageItems>(name: K): StorageItems[K] {
		if (!this.hasItem(name)) {
			throw new StorageError(`Storage item with name "${name}" is not defined.`);
		}

		return JSON.parse(localStorage.getItem(name)!);
	}

	public setItem<K extends keyof StorageItems>(name: K, value: StorageItems[K]) {
		localStorage.setItem(name, JSON.stringify(value));
	}

	private validate(defaultItems: StorageItems) {
		for (const nameTSUntyped in defaultItems) {
			const name = nameTSUntyped as keyof StorageItems;

			if (!this.hasItem(name) || !storageItems.shape[name].safeParse(this.getItem(name)).success) {
				this.setItem(name, defaultItems[name]);
			}
		}
	}
}
