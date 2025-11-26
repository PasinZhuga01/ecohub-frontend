import { UtilsError } from './errors';

export function toFixedNumber(value: number, digits: number) {
	return Number(value.toFixed(digits));
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function createLookup<K extends string, V extends unknown>(object: Partial<Record<K, V>>, defaultValue: V) {
	return (name: K) => object[name] ?? defaultValue;
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
