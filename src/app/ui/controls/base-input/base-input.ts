import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive()
export abstract class BaseInput<T> {
	@Input() public name: string = '';
	@Input() public className: string = '';

	@Output() public valueChanged = new EventEmitter<T>();
}
