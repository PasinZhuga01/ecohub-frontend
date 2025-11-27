import { Component, effect, inject, signal } from '@angular/core';
import { MarketService, MessageBoxService, RouterService } from '@core/services';
import { createLookup } from '@core/utils';
import { EntityList, EntityErrorWrapper } from '@ui/features/entities';
import { Code } from 'ecohub-shared/http/payloads';
import { createProjectSignal } from '@features/projects';

@Component({
	selector: 'app-home',
	imports: [EntityList, EntityErrorWrapper],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	protected readonly _service = inject(MarketService);
	protected readonly _project = createProjectSignal();
	protected readonly _router = inject(RouterService);

	protected readonly _marketName = signal('');

	private readonly _messageBox = inject(MessageBoxService);
	private readonly _getErrorText = createLookup<Code, string>(
		{
			INVALID_FORMAT: 'Название рынка не было введено',
			NAME_TAKEN: 'Рынок с таким названием уже существует'
		},
		'Неизвестная ошибка'
	);

	public constructor() {
		effect(() => {
			const project = this._project();

			if (project.isValid) {
				this._service.refreshItems(project.id);
			}
		});
	}

	protected async _create() {
		const result = await this._service.create(this._project().id, this._marketName());

		if (!result.success) {
			return this._messageBox.messageConfig.set({ type: 'error', text: this._getErrorText(result.code) });
		}

		this._marketName.set('');
	}

	protected _showRemoveConfirm({ id, name }: { id: number; name: string }) {
		this._messageBox.messageConfig.set({
			type: 'confirm',
			text: `Вы уверены что хотите удалить рынок "${name}"? Отменить это действие будет невозможно`,
			onConfirm: () => this._service.remove(id)
		});
	}
}
