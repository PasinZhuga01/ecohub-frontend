import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService, StorageService, RouterService } from '@core/services';

@Component({
	selector: 'app-header',
	imports: [MatIconModule],
	templateUrl: './header.html',
	styleUrl: './header.css'
})
export class Header {
	protected readonly _router = inject(RouterService);
	protected readonly _profile = inject(ProfileService);

	private readonly _storage = inject(StorageService);

	protected _toggleNavVisible() {
		this._storage.isNavVisible.update((value) => !value);
	}
}
