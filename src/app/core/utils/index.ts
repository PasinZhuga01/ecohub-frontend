export function toFixedNumber(value: number, digits: number) {
	return Number(value.toFixed(digits));
}

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}
