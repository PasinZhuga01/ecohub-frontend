import { Component, signal, inject, input } from '@angular/core';
import { ButtonControl, TextControl, NumberControl } from '@ui/controls';
import { MessageBoxService } from '@core/services';

import { CurrencyCreateService } from './currency-create.service';

@Component({
	selector: 'app-currency-create',
	imports: [ButtonControl, TextControl, NumberControl],
	templateUrl: './currency-create.html',
	styleUrl: './currency-create.css'
})
export class CurrencyCreate {
	public readonly projectId = input.required<number>();

	protected readonly _iconSrc = signal('');
	protected readonly _name = signal('');
	protected readonly _rate = signal(1);

	private readonly _messageBox = inject(MessageBoxService);
	private readonly _service = inject(CurrencyCreateService);

	protected async _create() {
		const args = { projectId: this.projectId(), name: this._name(), iconSrc: this._iconSrc(), rate: this._rate() };
		const result = await this._service.create(args);

		if (!result.success) {
			return this._messageBox.messageConfig.set({ type: 'error', text: result.message });
		}

		this._clear();
	}

	protected async _uploadIcon() {
		this._iconSrc.set(await this._service.uploadIcon());
	}

	private _clear() {
		this._iconSrc.set('');
		this._name.set('');
		this._rate.set(1);
	}
}
