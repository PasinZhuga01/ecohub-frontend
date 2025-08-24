import { Injectable } from '@angular/core';

import { StorageItems } from './storage-service.types';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	public getItem<K extends keyof StorageItems>(name: K): StorageItems[K] {
		return this.getNullableItemOrThrow(name, true)!;
	}

	public getNullableItem<K extends keyof StorageItems>(name: K): StorageItems[K] | null {
		return this.getNullableItemOrThrow(name, false);
	}

	public setItem<K extends keyof StorageItems>(name: K, value: StorageItems[K]) {
		localStorage.setItem(name, JSON.stringify(value));
	}

	private getNullableItemOrThrow<K extends keyof StorageItems>(name: K, shouldThrow: boolean): StorageItems[K] | null {
		if (shouldThrow && !(name in localStorage)) {
			throw new Error(`Storage item with name "${name}" is not defined.`);
		}

		return JSON.parse(localStorage.getItem(name)!);
	}
}
