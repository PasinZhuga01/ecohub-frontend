import { Component, inject, signal } from '@angular/core';
import { CurrencyService } from '@core/services';
import { NumberControl, ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-currency-rate-shift',
	imports: [NumberControl, ButtonControl],
	templateUrl: './currency-rate-shift.html',
	styleUrl: './currency-rate-shift.css'
})
export class CurrencyRateShift {
	protected readonly _value = signal(0);
	protected readonly _service = inject(CurrencyService);
}
