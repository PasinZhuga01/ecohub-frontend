import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SVG_ICON_SOURCES, SvgIconSource } from '@core/resources';

@Injectable({
	providedIn: 'root'
})
export class SvgIconService {
	private readonly _matIconRegistry = inject(MatIconRegistry);
	private readonly _domSanitizer = inject(DomSanitizer);

	public register() {
		for (const nameTSUntyped in SVG_ICON_SOURCES) {
			const name = nameTSUntyped as SvgIconSource;

			this._matIconRegistry.addSvgIcon(name, this._domSanitizer.bypassSecurityTrustResourceUrl('/images/' + SVG_ICON_SOURCES[name]));
		}
	}
}
