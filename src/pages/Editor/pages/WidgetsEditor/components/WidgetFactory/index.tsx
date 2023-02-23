import { CSSProperties } from "styled-components";
import { ButtonConfig, InputConfig, WidgetTypes } from "@/types/widget";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import { Table } from "@/widgets/Table";

interface WidgetFactoryProps {
  id: string;
  widgetType: WidgetTypes;
  style?: CSSProperties;
  config?: Record<string, any>;
  updateWidgetsValue: (id: string, value: any) => void;
}

export const WidgetFactory = ({
  id,
  widgetType,
  style = {},
  config,
  updateWidgetsValue,
}: WidgetFactoryProps) => {
  switch (widgetType) {
    case "BUTTON":
      return <Button style={style} config={config as ButtonConfig} />;
    case "INPUT":
      return (
        <Input
          id={id}
          style={style}
          config={config as InputConfig}
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
