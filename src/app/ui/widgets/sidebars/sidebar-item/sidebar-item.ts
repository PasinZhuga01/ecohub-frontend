import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { SvgIconSource } from '@core/resources';

@Component({
	selector: 'app-sidebar-item',
	imports: [MatIcon, CommonModule],
	templateUrl: './sidebar-item.html',
	styleUrl: './sidebar-item.css'
})
export class SidebarItem {
	public readonly value = input.required<string>();

	public readonly isSpecial = input(false);
	public readonly iconName = input<SvgIconSource>();
	public readonly isExpanded = model<boolean>();

	public readonly clicked = output();
}
