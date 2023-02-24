import { Map } from "immutable";
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
  styleProperties: WidgetStyleProperties[];
  configs: BaseWidgetConfigObject[];
  events: BaseWidgetEventObject[];
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
  events: Record<string, string[]>;
  config: Record<string, any>;
}

export type WidgetsMap = Record<string, WidgetComponent>;
export type ActionsMap = Record<string, WIDGET_ACTION>;

export type WidgetsValueMap = Map<string, any>;
