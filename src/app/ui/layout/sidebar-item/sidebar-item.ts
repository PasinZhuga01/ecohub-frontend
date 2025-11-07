import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ConfigManager } from '@core/managers';

import { SidebarItemInputConfig, SidebarItemConfig, SidebarItemExpansion, SidebarItemClickEvent } from './sidebar-item.types';

@Component({
	selector: 'app-sidebar-item',
	imports: [MatIcon, CommonModule],
	templateUrl: './sidebar-item.html',
	styleUrl: './sidebar-item.css'
})
export class SidebarItem<T> {
	public readonly config = input<SidebarItemInputConfig<T>>({ id: -1, text: '' });
	public readonly clicked = output<SidebarItemClickEvent<T>>();

	protected readonly _configManager = new ConfigManager<SidebarItemConfig<T>>(
		{
			id: -1,
			text: '',
			isSpecial: false,
			level: 0
		},
		this.config
	);

	protected _onClick(config: SidebarItemConfig<T>) {
		if ('value' in config) {
			return this.clicked.emit({ value: config.value, isExplicit: true });
		}

		this.clicked.emit({ value: config, isExplicit: false });
	}

	protected _toggleExpanded(expansion: SidebarItemExpansion<T>) {
		this._configManager.set({ expansion: { ...expansion, isExpanded: !expansion.isExpanded } });
	}

	protected _prepareItemConfig(config: SidebarItemInputConfig<T>, nextLevel: number): SidebarItemInputConfig<T> {
		config.level = nextLevel;

		return config;
	}
}
