import { WidgetItem } from "../types/widget";
export const DefaultDragType = "Widget";

export const widgetList: WidgetItem[] = [
  {
    title: "Button",
    type: "BUTTON",
    previewStyle: {
      height: "32px",
      width: "96px",
    },
  },
  {
    title: "Input",
    type: "INPUT",
    previewStyle: {
      height: "32px",
      width: "200px",
    },
  },
  {
    title: "Table",
    type: "TABLE",
    previewStyle: {
      height: "400px",
      width: "304px",
    },
  },
];
