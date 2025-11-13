import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, StorageService } from '@core/services';
import { Sidebar, SidebarItem } from '@ui/widgets/sidebars';

@Component({
	selector: 'app-profile-menu',
	imports: [Sidebar, SidebarItem],
	templateUrl: './profile-menu.html',
	styleUrl: './profile-menu.css'
})
export class ProfileMenu {
	protected readonly _service = inject(ProfileService);

	private readonly _storage = inject(StorageService);
	private readonly _router = inject(Router);

	protected _logout() {
		this._storage.token.set(null);
		this._router.navigate(['/']);
	}
}
