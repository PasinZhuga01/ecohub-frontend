import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

import { SidebarItemInputConfig, SidebarItemConfig, SidebarItemExpandState } from './sidebar-item.types';

@Component({
	selector: 'app-sidebar-item',
	imports: [MatIcon, CommonModule],
	templateUrl: './sidebar-item.html',
	styleUrl: './sidebar-item.css'
})
export class SidebarItem {
	public readonly config = input.required<SidebarItemInputConfig>();
	public readonly clicked = output<SidebarItemConfig>();

	protected readonly _config = signal<SidebarItemConfig>({ id: -1, text: '', isSpecial: false, level: 0 });

	public constructor() {
		effect(() => this._config.update((config) => ({ ...config, ...this.config() })));
	}

	protected _toggleExpandState(expandState: SidebarItemExpandState) {
		this._config.update((config) => ({ ...config, expandState: { ...expandState, isExpanded: !expandState.isExpanded } }));
	}

	protected _prepareSubItemConfig(config: SidebarItemInputConfig, nextLevel: number): SidebarItemInputConfig {
		config.level = nextLevel;

		return config;
	}
}
