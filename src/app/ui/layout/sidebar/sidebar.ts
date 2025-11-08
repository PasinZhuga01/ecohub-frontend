import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-sidebar',
	imports: [CommonModule],
	templateUrl: './sidebar.html',
	styleUrl: './sidebar.css'
})
export class Sidebar {
	public readonly CSSAbsolutePositionConfig = input<Partial<Record<'left' | 'right' | 'top' | 'bottom', string>> | null>(null);
}
