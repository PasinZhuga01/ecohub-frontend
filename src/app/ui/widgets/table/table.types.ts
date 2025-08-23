import { TableCellConfig } from '../table-cell/table-cell.types';
import { TableRowConfig, TableRowButtonClickEvent } from '../table-row/table-row.types';

export type TableSchema = { [header: string]: TableCellConfig<string> };

export type TableConfig<T extends TableSchema> = { headers: Record<keyof T, string>; rows: TableRowConfig<T>[] };
export type TableButtonClickEvent<T extends TableSchema> = TableRowButtonClickEvent<keyof T> & { row: TableRowConfig<T> };
