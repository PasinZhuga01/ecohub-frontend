import { Component, input } from '@angular/core';

@Component({
	selector: 'app-separator',
	imports: [],
	templateUrl: './separator.html',
	styleUrl: './separator.css',
	host: {
		'[class]': 'type()',
		'[class.invisible]': 'isInvisible()'
	}
})
export class Separator {
	public readonly type = input.required<'horizontal' | 'vertical'>();
	public readonly isInvisible = input<boolean>(false);
}
