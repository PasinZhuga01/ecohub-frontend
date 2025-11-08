import { Directive, input } from '@angular/core';

@Directive()
export abstract class BaseControl {
	public readonly name = input<string>();
}
