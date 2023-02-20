import { CSSProperties } from "react";
import { XYCoord } from "react-dnd";

export const WidgetsTypeMap = {
  BUTTON: "BUTTON",
  INPUT: "INPUT",
  TABLE: "TABLE",
} as const;

export interface WidgetStyleProperties {
  id: keyof CSSProperties;
  label: string;
  type: string;
  default: any;
}

export interface BaseWidget {
  title: string;
  type: WidgetTypes;
  previewStyle: CSSProperties;
  styleProperties: WidgetStyleProperties[];
}

export type WidgetTypes = keyof typeof WidgetsTypeMap;

export interface DropItem {
  baseWidget: BaseWidget;
  isNewWidget: boolean;
  id: string;
  widgetType: WidgetTypes;
  styles: CSSProperties;
}

export interface WidgetComponent extends DropItem {
  currentOffset: XYCoord | null;
}
