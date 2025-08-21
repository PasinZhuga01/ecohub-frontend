import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-header',
	imports: [MatIconModule],
	templateUrl: './header.html',
	styleUrl: './header.css'
})
export class Header {
	@Input({ required: true }) public profileLogin: string | null = null;

	@Output() public navToggled = new EventEmitter<void>();
	@Output() public logoClicked = new EventEmitter<void>();
	@Output() public authClicked = new EventEmitter<void>();
	@Output() public profileClicked = new EventEmitter<void>();
}
