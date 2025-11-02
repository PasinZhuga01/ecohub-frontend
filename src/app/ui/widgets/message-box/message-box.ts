import { Component } from '@angular/core';
import { MessageBoxService } from '@core/ui';
import { ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-message-box',
	imports: [ButtonControl],
	templateUrl: './message-box.html',
	styleUrl: './message-box.css'
})
export class MessageBox {
	public constructor(protected readonly _service: MessageBoxService) {}

	protected get _overlayCSSClasses(): string {
		return this._service.isActive ? 'active' : '';
	}

	protected _onConfirm() {
		this._service.messageOptions.onConfirm?.();
		this._service.hide();
	}

	protected _onCancel() {
		this._service.messageOptions.onCancel?.();
		this._service.hide();
	}
}
