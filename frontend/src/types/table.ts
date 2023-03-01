export const TableColumnTypesMap = {
  TEXT: "TEXT",
  INPUT: "INPUT",
  BUTTON: "BUTTON",
} as const;

export type TableColumnTypes = keyof typeof TableColumnTypesMap;

export interface TableColumn {
  label: string;
  key?: string;
  type: TableColumnTypes;
}
