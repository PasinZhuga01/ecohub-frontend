import { Component, inject, signal } from '@angular/core';
import { EntityList } from '@ui/features/entities';
import { MessageBoxService, ProjectService, RouterService } from '@core/services';
import { Code } from 'ecohub-shared/http/payloads';
import { createLookup } from '@core/utils';

@Component({
	selector: 'app-home',
	imports: [EntityList],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	protected readonly _service = inject(ProjectService);
	protected readonly _router = inject(RouterService);

	protected readonly _projectName = signal('');

	private readonly _messageBox = inject(MessageBoxService);
	private readonly _getErrorText = createLookup<Code, string>(
		{
			INVALID_FORMAT: 'Название проекта не было введено',
			NAME_TAKEN: 'Проект с таким названием уже существует'
		},
		'Неизвестная ошибка'
	);

	public constructor() {
		this._service.initializeItems();
	}

	protected async _create() {
		const result = await this._service.create(this._projectName());

		if (!result.success) {
			return this._messageBox.messageConfig.set({ type: 'error', text: this._getErrorText(result.code) });
		}

		this._projectName.set('');
	}

	protected _showRemoveConfirm({ id, name }: { id: number; name: string }) {
		this._messageBox.messageConfig.set({
			type: 'confirm',
			text: `Вы уверены что хотите удалить проект "${name}"? Отменить это действие будет невозможно`,
			onConfirm: () => this._service.remove(id)
		});
	}
}
