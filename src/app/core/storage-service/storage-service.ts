import { Injectable } from '@angular/core';

import { StorageItems } from './storage-service.types';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	public get<K extends keyof StorageItems>(name: K): StorageItems[K] {
		if (!(name in localStorage)) {
			throw new Error(`Storage Item with name "${name}" is not defined.`);
		}

		return JSON.parse(localStorage.getItem(name)!);
	}

	public set<K extends keyof StorageItems>(name: K, value: StorageItems[K]) {
		localStorage.setItem(name, JSON.stringify(value));
	}
}
