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
      { id: "height", label: "Height", defaultValue: "32px", type: "string" },
      { id: "width", label: "Width", defaultValue: "96px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
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
      { id: "height", label: "Height", defaultValue: "32px", type: "string" },
      { id: "width", label: "Width", defaultValue: "200px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
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
      { id: "height", label: "Height", defaultValue: "400px", type: "string" },
      { id: "width", label: "Width", defaultValue: "304px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
    ],
  },
};

export const widgetList: BaseWidget[] = Object.values(BASE_WIDGET_MAP);
