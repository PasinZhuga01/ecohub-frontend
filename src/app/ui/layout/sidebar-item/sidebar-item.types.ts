import { PartialExcept } from '@core/types';

export interface SidebarItemConfig<T> {
	id: number;
	text: string;
	level: number;
	isSpecial: boolean;
	value?: T;
	iconName?: string;
	expansion?: SidebarItemExpansion<T>;
}

export type SidebarItemInputConfig<T> = PartialExcept<SidebarItemConfig<T>, 'id' | 'text'>;

export type SidebarItemExpansion<T> = { isExpanded?: boolean; items: SidebarItemInputConfig<T>[] };
export type SidebarItemClickEvent<T> = { value: T; isExplicit: true } | { value: SidebarItemConfig<T>; isExplicit: false };
