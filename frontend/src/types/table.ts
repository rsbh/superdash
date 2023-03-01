export const TableColumnTypesMap = {
  TEXT: "TEXT",
} as const;

export type TableColumnTypes = keyof typeof TableColumnTypesMap;

export interface TableColumn {
  label: string;
  key?: string;
  type: TableColumnTypes;
}
