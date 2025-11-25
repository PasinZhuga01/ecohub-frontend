import { WritableSignal } from '@angular/core';

export function renameItemInArray<T extends { id: number; name: string }>(array: WritableSignal<T[]>, id: number, name: string) {
	array.update((items) =>
		items.map((item) => {
			if (item.id === id) {
				item.name = name;
			}

			return item;
		})
	);
}
