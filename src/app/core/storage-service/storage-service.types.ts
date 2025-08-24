export type StorageItems = {
	token: string;
	isNavigationVisible: boolean;
	expandedNavigationItemIndexes: number[];
	marketsCurrenciesIndex: { [marketId: number]: number };
};
