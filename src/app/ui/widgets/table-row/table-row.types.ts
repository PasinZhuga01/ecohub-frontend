import { TableSchema } from '../table/table.types';
import { TableCellConfig } from '../table-cell/table-cell.types';

export type TableRowConfig<T extends TableSchema, K extends keyof T> = { id: number; cells: Record<K, T[K]> };
export type TableRowButtonClickEvent<K extends string | number | symbol> = { cell: TableCellConfig<K>; name: string };
