import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { SidebarItemConfig } from './sidebar-item.types';

@Component({
	selector: 'app-sidebar-item',
	imports: [MatIcon],
	templateUrl: './sidebar-item.html',
	styleUrl: './sidebar-item.css'
})
export class SidebarItem {
	@Input({ required: true }) public config: SidebarItemConfig = { id: -1, isVisible: true, isSpecial: true, level: 0, text: '' };

	@Output() public clicked = new EventEmitter<void>();
	@Output() public expanded = new EventEmitter<void>();

	protected _isExpanded = signal<boolean>(false);

	protected get _expandSymbol(): string {
		return this._isExpanded() ? '-' : '+';
	}

	protected get _classes(): string {
		const specialClass = this.config.isSpecial ? 'special' : '';
		const levelClass = this.config.level > 0 ? `item-level-${this.config.level}` : '';

		return `${specialClass} ${levelClass}`;
	}

	protected _expand() {
		this._isExpanded.update((value) => !value);
		this.expanded.emit();
	}
}
