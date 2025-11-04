import { Component, computed, input, output, Signal, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ConfigManager } from '@core/managers';

import { SidebarItemConfig } from './sidebar-item.types';

@Component({
	selector: 'app-sidebar-item',
	imports: [MatIcon],
	templateUrl: './sidebar-item.html',
	styleUrl: './sidebar-item.css'
})
export class SidebarItem {
	public readonly configInput = input.required<Partial<SidebarItemConfig>>({ alias: 'config' });

	public readonly clicked = output<void>();
	public readonly expanded = output<boolean>();

	private readonly _configManager = new ConfigManager<SidebarItemConfig>(
		{
			id: -1,
			isVisible: true,
			isSpecial: true,
			level: 0,
			text: ''
		},
		this.configInput
	);

	protected readonly _expandSymbol = computed(() => (this._isExpanded() ? '-' : '+'));

	private readonly _isExpanded = signal<boolean>(false);

	protected get _config(): Signal<SidebarItemConfig> {
		return this._configManager.config;
	}

	protected _expand() {
		this._isExpanded.update((value) => !value);
		this.expanded.emit(this._isExpanded());
	}
}
