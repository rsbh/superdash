import { CSSProperties } from "react";
import { WIDGET_ACTION } from "./actions";

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

export interface WidgetConfig {
  id: string;
  label: string;
  type: string;
  defaultValue: any;
}

export interface BaseWidget {
  title: string;
  type: WidgetTypes;
  styleProperties: WidgetStyleProperties[];
  configs: WidgetConfig[];
}

export interface ButtonConfig {
  text: string;
}

export interface InputConfig {
  type: string;
  label: string;
  placeholder: string;
}

export type WidgetTypes = keyof typeof WidgetsTypeMap;

export interface DropItem {
  id: string;
  widgetType: WidgetTypes;
  styles: CSSProperties;
  size: {
    height: string;
    width: string;
  };
}

export interface WidgetComponent extends DropItem {
  config: Record<string, any>;
}

export type WidgetsMap = Record<string, WidgetComponent>;
export type ActionsMap = Record<string, WIDGET_ACTION>;

export interface PageConfig {
  title: string;
  id: string;
  widgets: WidgetsMap;
  actions: ActionsMap;
  widgetsCount: number;
}
