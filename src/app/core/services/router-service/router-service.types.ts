export type Route =
	| '/'
	| '/auth'
	| `/projects`
	| `/project/${number}`
	| `/project/${number}/currencies`
	| `/project/${number}/markets`
	| `/project/${number}/market/${number}`;
