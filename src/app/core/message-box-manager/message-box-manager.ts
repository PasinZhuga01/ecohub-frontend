import { Injectable, signal } from '@angular/core';

import { MessageBoxObject } from './message-box-manager.types';

@Injectable()
export class MessageBoxManager<T extends string> {
	private message = signal<MessageBoxObject<T> | null>(null);

	public get isActive(): boolean {
		return this.message() !== null;
	}

	public get header(): string {
		return this.message()?.header ?? '';
	}

	public get description(): string {
		return this.message()?.description ?? '';
	}

	public setMessage(message: MessageBoxObject<T>) {
		this.message.set(message);
	}

	public onClick(isOk: boolean) {
		isOk ? this.message()?.onConfirm?.() : this.message()?.onCancel?.();

		this.message.set(null);
	}
}
