export type Route =
	| '/'
	| '/auth'
	| `/projects`
	| `/project/${number}`
	| `/project/${number}/edit`
	| `/project/${number}/currencies`
	| `/project/${number}/markets`
	| `/project/${number}/market/${number}`
	| `/project/${number}/market/${number}/edit`;
