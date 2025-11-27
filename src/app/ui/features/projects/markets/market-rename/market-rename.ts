import { Component, inject, input, output, signal } from '@angular/core';
import { MarketService, MessageBoxService } from '@core/services';
import { createLookup } from '@core/utils';
import { EntityNameInput } from '@ui/features/entities';
import { Code } from 'ecohub-shared/http/payloads';

@Component({
	selector: 'app-market-rename',
	imports: [EntityNameInput],
	templateUrl: './market-rename.html',
	styleUrl: './market-rename.css'
})
export class MarketRename {
	public readonly marketId = input.required<number>();
	public readonly renamed = output<string>();

	protected readonly _newName = signal('');

	private readonly _service = inject(MarketService);
	private readonly _messageBox = inject(MessageBoxService);

	private readonly _getRenameErrorText = createLookup<Code, string>(
		{
			NAME_TAKEN: 'Указанное название рынка уже используется',
			INVALID_FORMAT: 'Некорректное название рынка или название не было введено'
		},
		'Неизвестная ошибка'
	);

	protected async _rename() {
		const result = await this._service.rename(this.marketId(), this._newName());

		if (!result.success) {
			return this._messageBox.messageConfig.set({ type: 'error', text: this._getRenameErrorText(result.code) });
		}

		this.renamed.emit(result.name);
		this._newName.set('');
	}
}
