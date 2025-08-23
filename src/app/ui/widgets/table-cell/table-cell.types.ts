import { INumberInput } from '../../controls/number-input/number-input.types';
import { ITextInput } from '../../controls/text-input/text-input.types';

export type TableCellItem =
	| { type: 'icon'; iconSrc: string }
	| { type: 'number'; number: number }
	| { type: 'number'; number: number; config: Partial<INumberInput>; isEditing?: true }
	| { type: 'text'; text: string }
	| { type: 'text'; text: string; config: Partial<ITextInput>; isEditing?: true }
	| { type: 'button'; text: string };

export type TableCellConfig<T extends string | symbol | number> = Record<T, TableCellItem>;
