export const TableColumnTypesMap = {
  TEXT: "TEXT",
  INPUT: "INPUT",
  BUTTON: "BUTTON",
  SELECT: "SELECT",
  SWITCH: "SWITCH",
  CHECKBOX: "CHECKBOX",
} as const;

export type TableColumnTypes = keyof typeof TableColumnTypesMap;

export interface TableColumn {
  label: string;
  key?: string;
  type: TableColumnTypes;
  data: string;
}
