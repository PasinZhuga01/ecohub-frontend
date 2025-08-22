import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IButtonInput {
	type: 'button' | 'submit';
	value: string;
}

@Component({
	selector: 'app-button-input',
	imports: [],
	templateUrl: './button-input.html',
	styleUrl: './button-input.css'
})
export class ButtonInput implements IButtonInput {
	@Input() public type: IButtonInput['type'] = 'button';
	@Input() public value: string = '';

	@Output() public clicked = new EventEmitter<void>();

	@Input() public set config(value: Partial<IButtonInput>) {
		if (value.type !== undefined) {
			this.type = value.type;
		}
		if (value.value !== undefined) {
			this.value = value.value;
		}
	}
}
