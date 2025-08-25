import { SidebarItemConfig } from './ui/layout/sidebar-item/sidebar-item.types';

export type NavItems = {
	list: SidebarItemConfig[];
	objects: Map<
		SidebarItemConfig,
		| { type: 'project' }
		| { type: 'currencies' | 'markets'; project: SidebarItemConfig }
		| { type: 'market'; project: SidebarItemConfig; markets: SidebarItemConfig }
		| { type: 'show-more' }
	>;
	expanded: Set<SidebarItemConfig>;
};
