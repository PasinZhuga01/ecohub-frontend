type SidebarItemBaseConfig = { id: number; level: 0 | 1 | 2; text: string };

type SidebarItemDefaultConfig = SidebarItemBaseConfig & { isSpecial: false; isExpandable: boolean; iconName: string };
type SidebarItemSpecialConfig = SidebarItemBaseConfig & { isSpecial: true };

export type SidebarItemConfig = SidebarItemDefaultConfig | SidebarItemSpecialConfig;
