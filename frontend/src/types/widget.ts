import { CSSProperties, ReactElement } from "react";
import { WIDGET_ACTION } from "./actions";

export const WIDGET_TYPES = {
  BUTTON: "BUTTON",
  INPUT: "INPUT",
  TABLE: "TABLE",
  SELECT: "SELECT",
  SWITCH: "SWITCH",
} as const;

export interface WidgetStyleProperties {
  id: keyof CSSProperties;
  label: string;
  type: string;
  defaultValue: any;
}

export interface BaseWidgetConfigObject {
  id: string;
  label: string;
  type: string;
  defaultValue: any;
}

export interface BaseWidgetEventObject {
  id: string;
  label: string;
  defaultValue: [];
}

export interface BaseWidget {
  title: string;
  type: WidgetTypes;
  icon: ReactElement;
  styleProperties: WidgetStyleProperties[];
  configs: BaseWidgetConfigObject[];
  events: BaseWidgetEventObject[];
}

export type WidgetTypes = keyof typeof WIDGET_TYPES;

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
  name: string;
  events: Record<string, string[]>;
  config: Record<string, any>;
}

export type WidgetsMap = Record<string, WidgetComponent>;
export type ActionsMap = Record<string, WIDGET_ACTION>;
