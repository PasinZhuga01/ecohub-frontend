import { TableSchema } from '../table/table.types';
import { TableCellConfig } from '../table-cell/table-cell.types';

export type TableRowConfig<TSchema extends TableSchema> = { id: number; cells: { [K in keyof TSchema]: TSchema[K] } };
export type TableRowButtonClickEvent<K extends string | number | symbol> = { cell: TableCellConfig<K>; name: string };
