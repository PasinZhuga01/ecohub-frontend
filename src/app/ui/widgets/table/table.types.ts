import { TableCellConfig } from '../table-cell/table-cell.types';
import { TableRowConfig, TableRowButtonClickEvent } from '../table-row/table-row.types';

export type TableSchema = { [header: string]: TableCellConfig<string> };

export type TableConfig<TSchema extends TableSchema> = { headers: Record<keyof TSchema, string>; rows: TableRowConfig<TSchema>[] };
export type TableButtonClickEvent<TSchema extends TableSchema> = TableRowButtonClickEvent<keyof TSchema> & { row: TableRowConfig<TSchema> };
