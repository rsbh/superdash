import { v4 as uuidv4 } from "uuid";

import { DropItem, WidgetComponent } from "../types/widget";
import { getBaseWidgetStyles } from "./style";

export function createNewWidgetFromDropItem(item: DropItem): WidgetComponent {
  const id = uuidv4();
  const styles = getBaseWidgetStyles(item.widgetType, item.styles);
  return {
    ...item,
    id,
    styles,
    widgetType: item.widgetType,
  };
}
