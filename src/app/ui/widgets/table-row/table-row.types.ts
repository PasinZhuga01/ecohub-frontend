import { TableSchema } from '../table/table.types';
import { TableCellConfig } from '../table-cell/table-cell.types';

export type TableRowConfig<T extends TableSchema> = { id: number; cells: { [K in keyof T]: T[K] } };
export type TableRowButtonClickEvent<K extends string | number | symbol> = { cell: TableCellConfig<K>; name: string };
