import { Injectable } from '@angular/core';
import { MessageBoxMessageOptions } from './message-box-service.types';

@Injectable({
	providedIn: 'root'
})
export class MessageBoxService {
	private _isActive: boolean = false;
	private _messageOptions: MessageBoxMessageOptions = { header: 'Header', description: 'Description' };

	public get isActive(): boolean {
		return this._isActive;
	}

	public get messageOptions(): MessageBoxMessageOptions {
		return this._messageOptions;
	}

	public show(messageOptions: MessageBoxMessageOptions) {
		this._messageOptions = messageOptions;
		this._isActive = true;
	}

	public hide() {
		this._isActive = false;
	}
}
