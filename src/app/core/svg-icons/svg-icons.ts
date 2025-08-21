import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class SvgIcons {
	public constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
	) {}

	public registerIcons(sources: { [name: string]: string }) {
		for (const name in sources) {
			this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl('/images/' + sources[name]!));
		}
	}
}
