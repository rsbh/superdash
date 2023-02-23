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

const ButtonWidgetEventsTypeMap = {
  onClick: "onClick",
} as const;

export type ButtonWidgetEventsType = keyof typeof ButtonWidgetEventsTypeMap;

export interface ButtonWidgetConfig {
  text: string;
}

export interface ButtonWidget extends DropItem {
  events: Record<ButtonWidgetEventsType, Array<string>>;
  config: ButtonWidgetConfig;
}

const InputWidgetEventsType = {
  onChange: "onChange",
} as const;

export type InputWidgetEventsType = keyof typeof InputWidgetEventsType;

export interface InputWidgetConfig {
  type: string;
  label: string;
  placeholder: string;
}

export interface InputWidget extends DropItem {
  events: Record<InputWidgetEventsType, Array<string>>;
  config: InputWidgetConfig;
}

export type WidgetComponent = ButtonWidget | InputWidget;
export type WidgetsMap = Record<string, WidgetComponent>;
export type ActionsMap = Record<string, WIDGET_ACTION>;

export interface PageConfig {
  title: string;
  id: string;
  widgets: WidgetsMap;
  actions: ActionsMap;
  widgetsCount: number;
}
