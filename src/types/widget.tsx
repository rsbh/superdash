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
  defaultValue: any;
}

export interface BaseWidget {
  title: string;
  type: WidgetTypes;
  styleProperties: WidgetStyleProperties[];
}

export type WidgetTypes = keyof typeof WidgetsTypeMap;

export interface DropItem {
  baseWidget: BaseWidget;
  id: string;
  widgetType: WidgetTypes;
  styles: CSSProperties;
  size: {
    height: string;
    width: string;
  };
}

export interface WidgetComponent extends DropItem {}
