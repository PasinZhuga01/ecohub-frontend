import { Component, inject, signal } from '@angular/core';
import { CurrencyService, MessageBoxService } from '@core/services';
import { Table, TableRow, TableCell } from '@ui/widgets/tables';
import { HighlightText } from '@ui/widgets';
import { NumberControl } from '@ui/controls';

@Component({
	selector: 'app-currency-list',
	imports: [Table, TableRow, TableCell, HighlightText, NumberControl],
	templateUrl: './currency-list.html',
	styleUrl: './currency-list.css'
})
export class CurrencyList {
	protected readonly _rateEditModeItems = signal(new Map<number, number>());
	protected readonly _service = inject(CurrencyService);

	private readonly _messageBox = inject(MessageBoxService);

	protected _setItemRateEditMode(id: number, rate: number) {
		this._rateEditModeItems.update((items) => new Map([...items, [id, rate]]));
	}

	protected async _changeItemRate(id: number) {
		const rate = this._rateEditModeItems().get(id);

		if (rate !== undefined) {
			await this._service.rerate(id, rate);
			this._cancelItemRateEditMode(id);
		}
	}

	protected _cancelItemRateEditMode(id: number) {
		this._rateEditModeItems.update((items) => {
			const instance = new Map([...items]);
			instance.delete(id);

			return instance;
		});
	}

	protected _showRemoveConfirm(id: number, name: string) {
		this._messageBox.messageConfig.set({
			type: 'confirm',
			text: `Вы уверены что хотите удалить валюту "${name}"? Отменить это действие будет невозможно`,
			onConfirm: () => this._service.remove(id)
		});
	}
}
