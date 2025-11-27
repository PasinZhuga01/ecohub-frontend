import { effect, inject, signal } from '@angular/core';
import { ProjectService } from '@core/services';
import { createParamsSignal } from '@features';

import { projectParamsSchema } from './schemas';

export function createProjectSignal() {
	const params = createParamsSignal(projectParamsSchema);
	const service = inject(ProjectService);

	const project = signal<{ id: number; name: string; isValid: boolean }>({ id: -1, name: '', isValid: false });

	effect(async () => {
		const paramsObject = params();

		if (paramsObject.success) {
			const result = await service.get(paramsObject.data.id);

			if (result.success) {
				return project.set({ id: paramsObject.data.id, name: result.name, isValid: true });
			}
		}

		project.update((project) => ({ ...project, isValid: false }));
	});

	return project;
}
