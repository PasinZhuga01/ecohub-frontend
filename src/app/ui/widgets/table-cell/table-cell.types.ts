import { INumberInput } from '@ui/controls/number-input/number-input.types';
import { ITextInput } from '@ui/controls/text-input/text-input.types';

export type TableCellItem =
	| { type: 'icon'; iconSrc: string }
	| { type: 'number'; number: number }
	| { type: 'number'; number: number; config: Partial<INumberInput>; onChange?: (value: number) => void; isEditing?: true }
	| { type: 'text'; text: string; isSpecial?: true }
	| { type: 'text'; text: string; config: Partial<ITextInput>; onChange?: (value: string) => void; isEditing?: true }
	| { type: 'button'; text: string };

export type TableCellConfig<T extends string | symbol | number> = Record<T, TableCellItem>;
