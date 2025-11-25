export function toFixedNumber(value: number, digits: number) {
	return Number(value.toFixed(digits));
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function createLookup<K extends string, V extends unknown>(object: Partial<Record<K, V>>, defaultValue: V) {
	return (name: K) => object[name] ?? defaultValue;
}
