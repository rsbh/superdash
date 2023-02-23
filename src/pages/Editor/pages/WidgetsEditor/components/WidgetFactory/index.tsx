import { CSSProperties } from "styled-components";
import {
  ButtonWidgetConfig,
  InputWidgetConfig,
  WidgetEventKeys,
  WidgetTypes,
} from "@/types/widget";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import { Table } from "@/widgets/Table";

interface WidgetFactoryProps {
  id: string;
  widgetType: WidgetTypes;
  style?: CSSProperties;
  config?: Record<string, any>;
  updateWidgetsValue: (widgetId: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: WidgetEventKeys) => void;
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
          config={config as ButtonWidgetConfig}
          handleWidgetEvent={handleWidgetEvent}
        />
      );
    case "INPUT":
      return (
        <Input
          id={id}
          style={style}
          config={config as InputWidgetConfig}
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
