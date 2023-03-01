import { CSSProperties } from "styled-components";
import { WidgetComponent, WidgetTypes, WIDGET_TYPES } from "@/types/widget";
import ButtonWidget from "./Button";
import InputWidget from "./Input";
import TableWidget from "./Table";
import { ValuesMap } from "@/types/page";
import SelectWidget from "./Select";
import Switch from "./Switch";

interface WidgetFactoryProps {
  widget: WidgetComponent;
  name: string;
  id: string;
  widgetType: WidgetTypes;
  style?: CSSProperties;
  config: Record<string, any>;
  updateWidgetsData: (name: string, value: any, keyName?: string) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
  onWidgetUpdate?: (id: string, updatedData: WidgetComponent) => void;
  actionsValuesMap: ValuesMap;
}

export const WidgetFactory = ({
  widget,
  id,
  widgetType,
  style = {},
  config,
  updateWidgetsData,
  handleWidgetEvent,
  name,
  actionsValuesMap,
  onWidgetUpdate,
}: WidgetFactoryProps) => {
  switch (widgetType) {
    case WIDGET_TYPES.BUTTON:
      return (
        <ButtonWidget
          id={id}
          style={style}
          config={config}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    case WIDGET_TYPES.INPUT:
      return (
        <InputWidget
          id={id}
          name={name}
          style={style}
          config={config}
          updateWidgetsData={updateWidgetsData}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    case WIDGET_TYPES.TABLE:
      return (
        <TableWidget
          style={style}
          id={id}
          name={name}
          config={config}
          handleWidgetEvent={handleWidgetEvent}
          actionsValuesMap={actionsValuesMap}
          onWidgetUpdate={onWidgetUpdate}
          widget={widget}
          updateWidgetsData={updateWidgetsData}
        />
      );
    case WIDGET_TYPES.SELECT:
      return (
        <SelectWidget
          id={id}
          name={name}
          style={style}
          config={config}
          updateWidgetsData={updateWidgetsData}
          handleWidgetEvent={handleWidgetEvent}
        />
      );

    case WIDGET_TYPES.SWITCH:
      return (
        <Switch
          id={id}
          name={name}
          style={style}
          config={config}
          updateWidgetsData={updateWidgetsData}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    default:
      return null;
  }
};
