import { Component } from '@angular/core';
import { ButtonInput } from '@ui/controls/button-input/button-input';

import { MessageBoxService } from './message-box-service';

@Component({
	selector: 'app-message-box',
	imports: [ButtonInput],
	templateUrl: './message-box.html',
	styleUrl: './message-box.css'
})
export class MessageBox {
	public constructor(protected service: MessageBoxService) {}

	protected get overlayCSSClasses(): string {
		return this.service.isActive ? 'active' : '';
	}

	protected onConfirm() {
		this.service.messageOptions.onConfirm?.();
		this.service.hide();
	}

	protected onCancel() {
		this.service.messageOptions.onCancel?.();
		this.service.hide();
	}
}
