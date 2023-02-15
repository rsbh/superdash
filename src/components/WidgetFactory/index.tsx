import { WidgetTypes } from "../../types/widget";

interface WidgetFactoryProps {
  widgetType: WidgetTypes;
}

export const WidgetFactory = (props: WidgetFactoryProps) => {
  switch (props.widgetType) {
    case "BUTTON": {
      return <button>Button</button>;
    }
    case "INPUT":
      return <input type="text"></input>;
    case "TABLE":
      return (
        <table>
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
        </table>
      );
    default:
      return null;
  }
};
