import { Component, effect, inject, signal } from '@angular/core';
import { ProjectService, RouterService } from '@core/services';
import { createParamsSignal } from '@features';
import { MatIcon } from '@angular/material/icon';

import { projectParamsSchema } from './project.schemas';
import { EntityErrorWrapper } from '@ui/features/entities';

@Component({
	selector: 'app-project',
	imports: [MatIcon, EntityErrorWrapper],
	templateUrl: './project.html',
	styleUrl: './project.css'
})
export class Project {
	protected readonly _project = signal<{ id: number; name: string; isValid: boolean }>({ id: -1, name: '', isValid: false });

	protected readonly _router = inject(RouterService);
	protected readonly _params = createParamsSignal(projectParamsSchema);

	private readonly _service = inject(ProjectService);

	public constructor() {
		effect(async () => {
			const params = this._params();

			if (params.success) {
				const result = await this._service.get(params.data.id);

				if (result.success) {
					return this._project.set({ id: params.data.id, name: result.name, isValid: true });
				}
			}

			this._project.update((project) => ({ ...project, isValid: false }));
		});
	}
}
