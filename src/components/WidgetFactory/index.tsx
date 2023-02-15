import { WidgetItemTypes } from "../../constants/widget";

interface WidgetFactoryProps {
  widgetType: WidgetItemTypes;
}

export const WidgetFactory = (props: WidgetFactoryProps) => {
  switch (props.widgetType) {
    case "button": {
      return <button>Button</button>;
    }
    case "input":
      return <input type="text"></input>;
    case "table":
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
