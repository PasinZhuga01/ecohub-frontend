import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-footer',
	imports: [MatIcon],
	templateUrl: './footer.html',
	styleUrl: './footer.css'
})
export class Footer {
	protected readonly _email = 'sergijumanskij@gmail.com' as const;
	protected readonly _phone = '+380 00 00 00 000' as const;
	protected readonly _telegram = 'PasinZhuga' as const;
}
