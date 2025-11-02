import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class SvgIcons {
	public constructor(private readonly _matIconRegistry: MatIconRegistry, private readonly _domSanitizer: DomSanitizer) {}

	public registerIcons(sources: { [name: string]: string }) {
		for (const name in sources) {
			this._matIconRegistry.addSvgIcon(name, this._domSanitizer.bypassSecurityTrustResourceUrl('/images/' + sources[name]!));
		}
	}
}
