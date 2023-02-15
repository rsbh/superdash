import { WidgetItem } from "../types/widget";
export const DefaultDragType = "Widget";

export const widgetList: WidgetItem[] = [
  {
    title: "Button",
    type: "BUTTON",
    previewStyle: {
      height: "20px",
      width: "50px",
    },
  },
  {
    title: "Input",
    type: "INPUT",
    previewStyle: {
      height: "20px",
      width: "150px",
    },
  },
  {
    title: "Table",
    type: "TABLE",
    previewStyle: {
      height: "400px",
      width: "300px",
    },
  },
];
