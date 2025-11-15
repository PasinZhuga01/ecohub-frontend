import { Component, inject } from '@angular/core';
import { ProfileService } from '@core/services';
import { Sidebar, SidebarItem } from '@ui/widgets/sidebars';

@Component({
	selector: 'app-profile-menu',
	imports: [Sidebar, SidebarItem],
	templateUrl: './profile-menu.html',
	styleUrl: './profile-menu.css'
})
export class ProfileMenu {
	protected readonly _service = inject(ProfileService);
}
