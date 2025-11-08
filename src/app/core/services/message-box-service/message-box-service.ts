import { Injectable, signal } from '@angular/core';

import { MessageBoxMessageConfig } from './message-box-service.types';

@Injectable({
	providedIn: 'root'
})
export class MessageBoxService {
	public readonly messageConfig = signal<MessageBoxMessageConfig | null>(null);
}
