import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class SvgIconService {
	private readonly _matIconRegistry = inject(MatIconRegistry);
	private readonly _domSanitizer = inject(DomSanitizer);

	public registerIcons(sources: { [name: string]: string }) {
		for (const name in sources) {
			this._matIconRegistry.addSvgIcon(name, this._domSanitizer.bypassSecurityTrustResourceUrl('/images/' + sources[name]!));
		}
	}
}
