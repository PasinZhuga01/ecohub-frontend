import { computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import z from 'zod';

export function createParamsSignal<T extends z.ZodType>(schema: T): Signal<z.output<T>> {
	const route = inject(ActivatedRoute);
	const params = toSignal(route.params, { requireSync: true });

	return computed(() => schema.parse(params()));
}
