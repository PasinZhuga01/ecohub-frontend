import { z } from 'zod';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ObjectValidationService {
	public filterValid<S extends z.ZodObject<z.ZodRawShape>>(object: Partial<z.input<S>>, schema: S): Partial<z.input<S>> {
		const result = { ...object };

		for (const shapeKey in schema.shape) {
			if (shapeKey in result && !schema.shape[shapeKey]!.safeParse(result[shapeKey]).success) {
				delete result[shapeKey];
			}
		}

		return result;
	}
}
