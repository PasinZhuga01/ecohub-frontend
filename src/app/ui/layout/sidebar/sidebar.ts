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

	@Output() public itemClicked = new EventEmitter<number>();
	@Output() public itemExpanded = new EventEmitter<number>();

	protected get classes(): string {
		return this.absolutePositionConfig !== null ? 'absolute' : '';
	}
}
