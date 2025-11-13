import { Component, inject, signal } from '@angular/core';
import { EntityList } from '@ui/features/entities';
import { MessageBoxService, ProjectService } from '@core/services';
import { Code } from 'ecohub-shared/http/payloads';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [EntityList],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	protected readonly _service = inject(ProjectService);
	protected readonly _router = inject(Router);

	protected readonly _projectName = signal<string>('');

	private readonly _messageBox = inject(MessageBoxService);

	public constructor() {
		this._service.initializeItems();
	}

	protected async _create() {
		const result = await this._service.create(this._projectName());

		if (!result.success) {
			return this._messageBox.messageConfig.set({
				header: 'Ошибка',
				description: this._createErrorText(result.code)
			});
		}

		this._projectName.set('');
	}

	private _createErrorText(code: Code): string {
		switch (code) {
			case 'INVALID_FORMAT':
				return 'Название проекта не было введено';
			case 'NAME_TAKEN':
				return 'Проект с таким названием уже существует';
		}

		return 'Неизвестная ошибка';
	}
}
