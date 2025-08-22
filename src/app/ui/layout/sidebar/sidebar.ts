import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarItem, SidebarItemConfig } from '../sidebar-item/sidebar-item';

@Component({
	selector: 'app-sidebar',
	imports: [SidebarItem, CommonModule],
	templateUrl: './sidebar.html',
	styleUrl: './sidebar.css'
})
export class Sidebar {
	@Input({ required: true }) public items: SidebarItemConfig[] = [];
	@Input() public absolutePositionConfig: Partial<Record<'left' | 'right' | 'top' | 'bottom', string>> | null = null;

	@Output() public itemClicked = new EventEmitter<SidebarItemConfig>();
	@Output() public itemExpanded = new EventEmitter<SidebarItemConfig>();

	protected get classes(): string {
		return this.absolutePositionConfig !== null ? 'absolute' : '';
	}
}
