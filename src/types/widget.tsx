import { CSSProperties } from "react";
import { XYCoord } from "react-dnd";

export const WidgetsTypeMap = {
  BUTTON: "BUTTON",
  INPUT: "INPUT",
  TABLE: "TABLE",
} as const;

export interface BaseWidget {
  title: string;
  type: WidgetTypes;
  previewStyle: CSSProperties;
}

export type WidgetTypes = keyof typeof WidgetsTypeMap;

export interface DropItem {
  baseWidget: BaseWidget;
  isNewWidget: boolean;
  id: string;
}

export interface WidgetComponent extends DropItem {
  currentOffset: XYCoord | null;
}
