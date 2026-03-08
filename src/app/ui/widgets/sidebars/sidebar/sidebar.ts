import { Component, input } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	imports: [],
	templateUrl: './sidebar.html',
	styleUrl: './sidebar.css'
})
export class Sidebar {
	public readonly isVisible = input(true);
	public readonly CSSAbsolutePositionConfig = input<Partial<Record<'left' | 'right' | 'top' | 'bottom', string>> | null>(null);
}
