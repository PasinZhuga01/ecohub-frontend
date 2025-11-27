import { WritableSignal } from '@angular/core';
import { AbortFlowError, UtilsError } from './errors';

export function toFixedNumber(value: number, digits: number) {
	return Number(value.toFixed(digits));
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function createLookup<K extends string, V extends unknown>(object: Partial<Record<K, V>>, defaultValue: V) {
	return (name: K | null) => (name === null ? defaultValue : object[name] ?? defaultValue);
}

export function copyObjectIfDefined<T extends object>(object: T | undefined): T | undefined {
	return object !== undefined ? { ...object } : undefined;
}

export function modifySignalArrayItems<T>(
	array: WritableSignal<T[]>,
	callbacks: { condition?: (item: T) => boolean; modify: (item: T) => void }
) {
	array.update((items) =>
		items.map((item) => {
			if (callbacks.condition === undefined || callbacks.condition(item)) {
				callbacks.modify(item);
			}

			return item;
		})
	);
}

export function base64ToBlob(base64: string) {
	const [meta, content] = base64.split(',');

	if (meta === undefined || content === undefined) {
		throw new UtilsError('base64 string was in an invalid format');
	}

	const mime = meta.match(/:(.*?);/)?.[1] ?? 'image/png';
	const byteCharacters = atob(content);
	const byteArrays = [];

	for (let i = 0; i < byteCharacters.length; i++) {
		byteArrays.push(byteCharacters.charCodeAt(i));
	}

	return new Blob([new Uint8Array(byteArrays)], { type: mime });
}

export async function processFlow<T = void>(callbacks: { onSuccess: () => T; onError: (error: AbortFlowError) => T }) {
	try {
		return await callbacks.onSuccess();
	} catch (error) {
		if (error instanceof AbortFlowError) {
			return await callbacks.onError(error);
		}

		throw error;
	}
}
