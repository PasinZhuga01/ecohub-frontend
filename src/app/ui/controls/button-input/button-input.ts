import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-button-input',
	imports: [],
	templateUrl: './button-input.html',
	styleUrl: './button-input.css'
})
export class ButtonInput {
	@Input() public type: 'button' | 'submit' = 'button';
	@Input() public value: string = '';
	@Input() public className: string = '';

	@Output() public clicked = new EventEmitter<void>();
}
