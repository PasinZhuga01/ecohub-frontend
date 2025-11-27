import { Component, inject, signal } from '@angular/core';
import { CurrencyService, MessageBoxService } from '@core/services';
import { NumberControl, ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-currency-rate-shift',
	imports: [NumberControl, ButtonControl],
	templateUrl: './currency-rate-shift.html',
	styleUrl: './currency-rate-shift.css'
})
export class CurrencyRateShift {
	protected readonly _value = signal(0);

	private readonly _service = inject(CurrencyService);
	private readonly _messageBox = inject(MessageBoxService);

	protected _showShiftRateConfirm() {
		this._messageBox.messageConfig.set({
			type: 'confirm',
			text: 'Вы уверены что хотите сдвинуть курс всех валют в текущем проекте? Курсы сдвигаются только вперёд и отменить сдвиг будет невозможно',
			onConfirm: () => this._service.shiftRate(this._value())
		});
	}
}
