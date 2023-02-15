import { CSSProperties } from "styled-components";
import { WidgetTypes } from "../../types/widget";
import { Button } from "../../widgets/Button";
import { Input } from "../../widgets/Input";
import { Table } from "../../widgets/Table";

interface WidgetFactoryProps {
  widgetType: WidgetTypes;
  style?: CSSProperties;
}

export const WidgetFactory = ({
  widgetType,
  style = {},
}: WidgetFactoryProps) => {
  switch (widgetType) {
    case "BUTTON":
      return <Button style={style}>Button</Button>;
    case "INPUT":
      return <Input type="text" style={style}></Input>;
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
