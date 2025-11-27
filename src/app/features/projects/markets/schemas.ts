import { z } from 'zod';

export const marketParamsSchema = z
	.object({ projectId: z.string(), marketId: z.string() })
	.refine(({ projectId, marketId }) => !isNaN(Number(projectId)) && !isNaN(Number(marketId)))
	.transform(({ projectId, marketId }) => ({ projectId: Number(projectId), marketId: Number(marketId) }));
