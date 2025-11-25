import { Component, inject } from '@angular/core';
import { MessageBoxService, MessageBoxType } from '@core/services';
import { ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-message-box',
	imports: [ButtonControl],
	templateUrl: './message-box.html',
	styleUrl: './message-box.css'
})
export class MessageBox {
	protected readonly _headers: { [K in MessageBoxType]: string } = { error: 'Ошибка', confirm: 'Подтверждение' };
	protected readonly _service = inject(MessageBoxService);

	protected _close(beforeClose?: () => void) {
		beforeClose?.();
		this._service.messageConfig.set(null);
	}
}
