import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarItem } from '../sidebar-item/sidebar-item';
import { SidebarItemConfig } from '../sidebar-item/sidebar-item.types';

@Component({
	selector: 'app-sidebar',
	imports: [SidebarItem, CommonModule],
	templateUrl: './sidebar.html',
	styleUrl: './sidebar.css'
})
export class Sidebar {
	public readonly items = input.required<SidebarItemConfig[]>();
	public readonly CSSFixedPositionConfig = input<Partial<Record<'left' | 'right' | 'top' | 'bottom', string>> | null>(null);

	public readonly itemClicked = output<SidebarItemConfig>();
	public readonly itemExpanded = output<SidebarItemConfig>();
}
