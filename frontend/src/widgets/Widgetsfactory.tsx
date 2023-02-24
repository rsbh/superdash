import { CSSProperties } from "styled-components";
import { WidgetTypes } from "@/types/widget";
import Button from "./Button";
import Input from "./Input";
import { Table } from "./Table";

interface WidgetFactoryProps {
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
}: WidgetFactoryProps) => {
  switch (widgetType) {
    case "BUTTON":
      return (
        <Button
          id={id}
          style={style}
          config={config}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    case "INPUT":
      return (
        <Input
          id={id}
          style={style}
          config={config}
          updateWidgetsValue={updateWidgetsValue}
        />
      );
    case "TABLE":
      return (
        <Table style={style}>
          <thead></thead>
          <tbody>
            <tr>
              <td>Table</td>
              <td>Table</td>
              <td>Table</td>
            </tr>
            <tr>
              <td>Table</td>
              <td>Table</td>
              <td>Table</td>
            </tr>
          </tbody>
        </Table>
      );
    default:
      return null;
  }
};
