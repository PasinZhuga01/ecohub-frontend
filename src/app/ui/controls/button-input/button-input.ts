import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IButtonInput {
	isAccented: boolean;
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
	@Input() public isAccented: boolean = true;
	@Input() public type: IButtonInput['type'] = 'button';
	@Input() public value: string = '';

	@Output() public clicked = new EventEmitter<void>();

	@Input() public set config(value: Partial<IButtonInput>) {
		if (value.isAccented !== undefined) {
			this.isAccented = value.isAccented;
		}
		if (value.type !== undefined) {
			this.type = value.type;
		}
		if (value.value !== undefined) {
			this.value = value.value;
		}
	}

	protected get accentingClass(): string {
		return this.isAccented ? '' : 'not-accented';
	}
}
