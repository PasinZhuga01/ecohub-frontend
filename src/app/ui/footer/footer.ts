import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-footer',
	imports: [MatIcon],
	templateUrl: './footer.html',
	styleUrl: './footer.css'
})
export class Footer {
	@Input({ required: true }) public contacts: Record<'email' | 'telegram' | 'phone', string> = {
		email: 'example@mail.com',
		telegram: 'example',
		phone: '+371 00 00 00 000'
	};
}
