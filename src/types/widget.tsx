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
  id: WidgetConfigKeys;
  label: string;
  type: string;
  defaultValue: any;
}

export interface BaseWidget {
  title: string;
  type: WidgetTypes;
  styleProperties: WidgetStyleProperties[];
  configs: BaseWidgetConfigObject[];
}

interface CommonWidgetConfig {
  name: string;
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

export interface ButtonWidgetConfig extends CommonWidgetConfig {
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

export interface InputWidgetConfig extends CommonWidgetConfig {
  type: string;
  label: string;
  placeholder: string;
}

type InputWidgetsEvents = Record<InputWidgetEventsType, Array<string>>;
type ButtonWidgetsEvents = Record<ButtonWidgetEventsType, Array<string>>;
export type WidgetEvents = ButtonWidgetsEvents | InputWidgetsEvents | {};

export type WidgetConfig =
  | ButtonWidgetConfig
  | InputWidgetConfig
  | CommonWidgetConfig;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type WidgetConfigKeys = KeysOfUnion<WidgetConfig>;

export interface WidgetComponent extends DropItem {
  events: WidgetEvents;
  config: WidgetConfig;
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
