import { computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import z from 'zod';
import { ProcessHttpCallbacks } from './types';

export function toFixedNumber(value: number, digits: number): number {
	return Number(value.toFixed(digits));
}

export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export function createParamsSignal<T extends z.ZodType>(schema: T): Signal<z.output<T>> {
	const route = inject(ActivatedRoute);
	const params = toSignal(route.params, { requireSync: true });

	return computed(() => schema.parse(params()));
}

export async function processHttp<TResponse extends object, TSuccess extends object = object, TError extends object = object>(
	callbacks: ProcessHttpCallbacks<TResponse, TSuccess, TError>
) {
	const result = await callbacks.sendRequest();

	if (!result.success) {
		return { success: false, code: result.payload.code };
	}

	return await callbacks.onSuccess(result.response);
}
