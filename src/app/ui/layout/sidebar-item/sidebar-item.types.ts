import { PartialExcept } from '@core/types';

export interface SidebarItemConfig {
	id: number;
	text: string;
	level: number;
	isSpecial: boolean;
	iconName?: string;
	expandState?: SidebarItemExpandState;
}

export type SidebarItemExpandState = { isExpanded?: boolean; subItems: SidebarItemInputConfig[] };
export type SidebarItemInputConfig = PartialExcept<SidebarItemConfig, 'id' | 'text'>;
