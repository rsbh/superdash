import { CSSProperties } from "react";
import { BASE_WIDGET_MAP } from "../constants/widget";
import { WidgetComponent, WidgetTypes } from "../types/widget";

export function getBaseWidgetStyles(
  widgetType: WidgetTypes,
  customStyles: CSSProperties = {}
): CSSProperties {
  const baseWidget = BASE_WIDGET_MAP[widgetType];
  return baseWidget.styleProperties.reduce((acc, styleProp) => {
    const { id, defaultValue } = styleProp;
    acc[id] = customStyles[id] || defaultValue;
    return acc;
  }, {} as any);
}
