import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-header',
	imports: [MatIconModule],
	templateUrl: './header.html',
	styleUrl: './header.css'
})
export class Header {
	public readonly profileLogin = input.required<string | null>();

	public readonly navToggled = output<void>();
	public readonly logoClicked = output<void>();
	public readonly authClicked = output<void>();
	public readonly profileClicked = output<void>();
}
