import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TextControl, ButtonControl } from '@ui/controls';

@Component({
	selector: 'app-entity-name-form',
	imports: [TextControl, ButtonControl, NgStyle],
	templateUrl: './entity-name-form.html',
	styleUrl: './entity-name-form.css'
})
export class EntityNameForm {
	@Input({ required: true }) public submitText: string = '';
	@Input() public widths: Partial<{ input: string; submit: string }> = {};

	@Output() public failed = new EventEmitter<string>();
	@Output() public submited = new EventEmitter<string>();

	protected _value: string = '';

	protected _onSubmit() {
		if (this._value.length === 0) {
			return this.failed.emit('Название не было указано');
		}

		this.submited.emit(this._value);
	}
}
