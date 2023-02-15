import { CSSProperties } from "react";

export const WidgetsTypeMap = {
  BUTTON: "BUTTON",
  INPUT: "INPUT",
  TABLE: "TABLE",
} as const;

export interface WidgetItem {
  id?: string;
  title: string;
  type: WidgetTypes;
  previewStyle: CSSProperties;
}

export type WidgetTypes = keyof typeof WidgetsTypeMap;
