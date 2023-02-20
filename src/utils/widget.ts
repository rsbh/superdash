import { v4 as uuidv4 } from "uuid";
import { BASE_WIDGET_MAP } from "../constants/widget";

import { DropItem, WidgetComponent, WidgetTypes } from "../types/widget";
import { getBaseWidgetStyles } from "./style";

export function createNewWidgetFromDropItem(item: DropItem): WidgetComponent {
  const id = uuidv4();
  const { widgetType, styles } = item;
  const widgetStyles = getBaseWidgetStyles(widgetType, styles);
  const config = getWidgetConfig(widgetType);
  return {
    ...item,
    id,
    config,
    styles: widgetStyles,
    widgetType: widgetType,
  };
}

export function getWidgetConfig(
  widgetType: WidgetTypes,
  config: Record<string, any> = {}
): Record<string, any> {
  const baseWidget = BASE_WIDGET_MAP[widgetType];
  return baseWidget.configs.reduce((acc, c) => {
    const { id, defaultValue } = c;
    acc[id] = config[id] || defaultValue;
    return acc;
  }, {} as any);
}
