import { Component, inject } from '@angular/core';
import { MessageBoxService } from '@core/services';
import { ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-message-box',
	imports: [ButtonControl],
	templateUrl: './message-box.html',
	styleUrl: './message-box.css'
})
export class MessageBox {
	protected readonly _service = inject(MessageBoxService);

	protected _close(beforeClose?: () => void) {
		beforeClose?.();
		this._service.messageConfig.set(null);
	}
}
