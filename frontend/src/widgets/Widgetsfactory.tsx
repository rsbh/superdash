import { CSSProperties } from "styled-components";
import { WidgetTypes } from "@/types/widget";
import ButtonWidget from "./Button";
import InputWidget from "./Input";
import TableWidget from "./Table";

interface WidgetFactoryProps {
  name: string;
  id: string;
  widgetType: WidgetTypes;
  style?: CSSProperties;
  config: Record<string, any>;
  updateWidgetsValue: (widgetId: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export const WidgetFactory = ({
  id,
  widgetType,
  style = {},
  config,
  updateWidgetsValue,
  handleWidgetEvent,
  name,
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
        />
      );
    default:
      return null;
  }
};
