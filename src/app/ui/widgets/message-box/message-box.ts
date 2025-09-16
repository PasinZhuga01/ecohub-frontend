import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonInput } from '@ui/controls/button-input/button-input';

@Component({
	selector: 'app-message-box',
	imports: [ButtonInput],
	templateUrl: './message-box.html',
	styleUrl: './message-box.css'
})
export class MessageBox {
	@Input() public header: string = '';
	@Input() public description: string = '';

	@Output() public clicked = new EventEmitter<boolean>();
}
