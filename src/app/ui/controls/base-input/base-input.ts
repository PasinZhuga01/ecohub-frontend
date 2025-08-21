import { Directive, Input } from '@angular/core';

@Directive()
export abstract class BaseInput {
	@Input() public name: string = '';
	@Input() public className: string = '';
}
