export const MESSAGES = {
	'not-found': {
		header: 'Ресурс не найден',
		description: 'К сожалению, запрошенная страница или элемент не существует. Возможно, ссылка устарела или была удалена.'
	},
	'not-found-or-access-denied': {
		header: 'Ресурс не найден или недоступен',
		description: 'Запрашиваемая страница или элемент не существует либо доступ к нему ограничен.'
	}
} as const satisfies Record<string, { header: string; description: string }>;
