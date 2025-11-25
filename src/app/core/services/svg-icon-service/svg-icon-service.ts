import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SVG_ICON_SOURCES, SvgIconSource } from '@core/resources';

@Injectable({
	providedIn: 'root'
})
export class SvgIconService {
	public register() {
		const matIconRegistry = inject(MatIconRegistry);
		const domSanitizer = inject(DomSanitizer);

		for (const nameTSUntyped in SVG_ICON_SOURCES) {
			const name = nameTSUntyped as SvgIconSource;

			matIconRegistry.addSvgIcon(name, domSanitizer.bypassSecurityTrustResourceUrl('/images/' + SVG_ICON_SOURCES[name]));
		}
	}
}
