import { CSSProperties } from "styled-components";
import { WidgetComponent, WidgetTypes } from "@/types/widget";
import ButtonWidget from "./Button";
import InputWidget from "./Input";
import TableWidget from "./Table";
import { ValuesMap } from "@/types/page";
import SelectWidget from "./Select";

interface WidgetFactoryProps {
  widget: WidgetComponent;
  name: string;
  id: string;
  widgetType: WidgetTypes;
  style?: CSSProperties;
  config: Record<string, any>;
  updateWidgetsValue: (widgetId: string, value: any) => void;
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
  updateWidgetsValue,
  handleWidgetEvent,
  name,
  actionsValuesMap,
  onWidgetUpdate,
}: WidgetFactoryProps) => {
  switch (widgetType) {
    case "BUTTON":
      return (
        <ButtonWidget
          id={id}
          style={style}
          config={config}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    case "INPUT":
      return (
        <InputWidget
          id={id}
          name={name}
          style={style}
          config={config}
          updateWidgetsValue={updateWidgetsValue}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    case "TABLE":
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
        />
      );
    case "SELECT":
      return (
        <SelectWidget
          id={id}
          name={name}
          style={style}
          config={config}
          updateWidgetsValue={updateWidgetsValue}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    default:
      return null;
  }
};
