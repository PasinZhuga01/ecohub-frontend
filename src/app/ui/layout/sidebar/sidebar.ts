import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarItem } from '../sidebar-item/sidebar-item';
import { SidebarItemClickEvent, SidebarItemInputConfig } from '../sidebar-item/sidebar-item.types';

@Component({
	selector: 'app-sidebar',
	imports: [SidebarItem, CommonModule],
	templateUrl: './sidebar.html',
	styleUrl: './sidebar.css'
})
export class Sidebar<T> {
	public readonly items = input.required<SidebarItemInputConfig<T>[]>();
	public readonly CSSAbsolutePositionConfig = input<Partial<Record<'left' | 'right' | 'top' | 'bottom', string>> | null>(null);

	public readonly clicked = output<SidebarItemClickEvent<T>>();
}
