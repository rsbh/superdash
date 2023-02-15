export const WidgetType = "Widget";

export interface WidgetItem {
  id?: string;
  title: string;
  type: string;
  previewStyle: {
    height: string | number;
    width: string | number;
  };
}

export const widgetList: WidgetItem[] = [
  {
    title: "Button",
    type: "button",
    previewStyle: {
      height: "20px",
      width: "50px",
    },
  },
  {
    title: "Input",
    type: "input",
    previewStyle: {
      height: "20px",
      width: "150px",
    },
  },
  {
    title: "Table",
    type: "table",
    previewStyle: {
      height: "400px",
      width: "300px",
    },
  },
];
