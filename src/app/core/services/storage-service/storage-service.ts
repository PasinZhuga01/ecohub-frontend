import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { schemas } from './storage-service.schemas';
import { StorageItems, StorageSchemas, StorageItemValue } from './storage-service.types';

@Injectable({
	providedIn: 'root'
})
export class StorageService implements StorageItems {
	public readonly token = this._createSignal('token', null);
	public readonly isNavVisible = this._createSignal('isNavVisible', false);

	private _getStorageItem<K extends keyof StorageSchemas>(name: K, defaultValue: StorageItemValue<K>): StorageItemValue<K> {
		const value = JSON.parse(localStorage.getItem(name) ?? '{}');
		const { success, data } = schemas[name].safeParse(value);

		return success ? data : defaultValue;
	}

	private _setStorageItem<K extends keyof StorageSchemas>(name: K, value: StorageItemValue<K>) {
		localStorage.setItem(name, JSON.stringify(value));
	}

	private _createSignal<K extends keyof StorageSchemas>(name: K, defaultValue: StorageItemValue<K>): WritableSignal<StorageItemValue<K>> {
		const result = signal(this._getStorageItem(name, defaultValue));

		effect(() => this._setStorageItem(name, result()));

		return result;
	}
}
