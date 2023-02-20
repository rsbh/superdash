import { BaseWidget, WidgetTypes } from "../types/widget";
export const DefaultDragType = "Widget";

export const BASE_WIDGET_MAP: Record<WidgetTypes, BaseWidget> = {
  BUTTON: {
    title: "Button",
    type: "BUTTON",
    previewStyle: {
      height: "32px",
      width: "96px",
    },
    styleProperties: [
      { id: "height", label: "Height", default: "32px", type: "string" },
      { id: "width", label: "Width", default: "96px", type: "string" },
      { id: "left", label: "Left", default: "0px", type: "string" },
      { id: "top", label: "Top", default: "0px", type: "string" },
    ],
  },
  INPUT: {
    title: "Input",
    type: "INPUT",
    previewStyle: {
      height: "32px",
      width: "200px",
    },
    styleProperties: [
      { id: "height", label: "Height", default: "32px", type: "string" },
      { id: "width", label: "Width", default: "200px", type: "string" },
      { id: "left", label: "Left", default: "0px", type: "string" },
      { id: "top", label: "Top", default: "0px", type: "string" },
    ],
  },
  TABLE: {
    title: "Table",
    type: "TABLE",
    previewStyle: {
      height: "400px",
      width: "304px",
    },
    styleProperties: [
      { id: "height", label: "Height", default: "400", type: "string" },
      { id: "width", label: "Width", default: "304px", type: "string" },
      { id: "left", label: "Left", default: "0px", type: "string" },
      { id: "top", label: "Top", default: "0px", type: "string" },
    ],
  },
};

export const widgetList: BaseWidget[] = Object.values(BASE_WIDGET_MAP);
