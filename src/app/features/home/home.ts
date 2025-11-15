import { Component, inject } from '@angular/core';
import { ButtonControl } from '@ui/controls';
import { RouterService } from '@core/services';

@Component({
	selector: 'app-home',
	imports: [ButtonControl],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	protected readonly _router = inject(RouterService);
}
