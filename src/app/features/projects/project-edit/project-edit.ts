import { Code } from 'ecohub-shared/http/payloads';
import { Component, inject, signal } from '@angular/core';
import { ProjectService, MessageBoxService, RouterService } from '@core/services';
import { EntityErrorWrapper, EntityNameInput } from '@ui/features/entities';
import { ButtonControl } from '@ui/controls';

import { createProjectSignal } from '../helpers';
import { createLookup } from '@core/utils';

@Component({
	selector: 'app-project-edit',
	imports: [EntityErrorWrapper, EntityNameInput, ButtonControl],
	templateUrl: './project-edit.html',
	styleUrl: './project-edit.css'
})
export class ProjectEdit {
	protected readonly _newName = signal('');

	protected readonly _project = createProjectSignal();
	protected readonly _router = inject(RouterService);

	private readonly _service = inject(ProjectService);
	private readonly _messageBox = inject(MessageBoxService);

	private readonly _getRenameErrorText = createLookup<Code, string>(
		{
			NAME_TAKEN: 'Указанное название проекта уже используется',
			INVALID_FORMAT: 'Некорректное название проекта или название не было введено'
		},
		'Неизвестная ошибка'
	);

	protected async _rename() {
		const result = await this._service.rename(this._project().id, this._newName());

		if (!result.success) {
			return this._messageBox.messageConfig.set({ type: 'error', text: this._getRenameErrorText(result.code) });
		}

		this._project.update((project) => ({ ...project, name: result.name }));
		this._newName.set('');
	}
}
