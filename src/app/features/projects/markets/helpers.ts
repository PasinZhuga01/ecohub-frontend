import { effect, inject, signal } from '@angular/core';
import { MarketService, ProjectService } from '@core/services';
import { createParamsSignal } from '@features';

import { marketParamsSchema } from './schemas';

export function createMarketSignal() {
	const params = createParamsSignal(marketParamsSchema);

	const projectService = inject(ProjectService);
	const marketService = inject(MarketService);

	const market = signal<{ projectId: number; marketId: number; currencyId: number | null; name: string } | null>(null);

	effect(async () => {
		const paramsObject = params();

		if (paramsObject.success) {
			const projectResult = await projectService.get(paramsObject.data.projectId);

			if (projectResult.success) {
				const marketResult = await marketService.get(paramsObject.data.marketId);

				if (marketResult.success) {
					return market.set({ ...paramsObject.data, ...marketResult });
				}
			}
		}

		market.set(null);
	});

	return market;
}
