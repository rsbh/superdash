import { v4 as uuidv4 } from "uuid";
import { BASE_WIDGET_MAP } from "../constants/widget";

import {
  DropItem,
  WidgetComponent,
  WidgetConfig,
  WidgetEvents,
  WidgetTypes,
} from "../types/widget";
import { getBaseWidgetStyles } from "./style";

export function createNewWidgetFromDropItem(
  item: DropItem,
  widgetCount: number
): WidgetComponent {
  const id = uuidv4();
  const { widgetType, styles } = item;
  const widgetStyles = getBaseWidgetStyles(widgetType, styles);
  const config = getWidgetConfig(widgetType, {
    name: `${widgetType}-${widgetCount}`,
  });
  const events = getWidgetEvents(widgetType);
  return {
    ...item,
    id,
    config,
    events,
    styles: widgetStyles,
    widgetType: widgetType,
  };
}

export function getWidgetConfig(
  widgetType: WidgetTypes,
  config: WidgetConfig
): WidgetConfig {
  const baseWidget = BASE_WIDGET_MAP[widgetType];
  return baseWidget.configs.reduce((acc, c) => {
    const { id, defaultValue } = c;
    //@ts-ignore
    acc[id] = config[id] || defaultValue;
    return acc;
  }, {} as any);
}

export function getWidgetEvents(widgetType: WidgetTypes): WidgetEvents {
  const baseWidget = BASE_WIDGET_MAP[widgetType];
  return baseWidget.events.reduce((acc, c) => {
    const { id, defaultValue } = c;
    acc[id] = defaultValue;
    return acc;
  }, {} as any);
}
