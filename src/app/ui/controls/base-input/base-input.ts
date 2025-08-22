import { Directive, Input, Output, EventEmitter } from '@angular/core';

export interface IBaseInput {
	name: string;
}

@Directive()
export abstract class BaseInput<T, I extends IBaseInput> implements IBaseInput {
	@Input() public name: string = '';

	@Output() public valueChanged = new EventEmitter<T>();

	@Input() public set config(value: Partial<I>) {
		if (value.name !== undefined) {
			this.name = value.name;
		}
	}
}
