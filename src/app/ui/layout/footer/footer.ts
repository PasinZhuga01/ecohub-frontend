import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-footer',
	imports: [MatIcon],
	templateUrl: './footer.html',
	styleUrl: './footer.css'
})
export class Footer {
	public readonly email = input.required<string>();
	public readonly telegram = input.required<string>();
	public readonly phone = input.required<string>();
}
