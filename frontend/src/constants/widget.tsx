import { RxButton, RxInput, RxTable, RxSwitch } from "react-icons/rx";
import { IconSelect } from "@tabler/icons-react";

import { BaseWidget, WidgetTypes, WIDGET_TYPES } from "../types/widget";
export const DefaultDragType = "Widget";

export const BASE_WIDGET_MAP: Record<WidgetTypes, BaseWidget> = {
  BUTTON: {
    title: "Button",
    icon: <RxButton />,
    type: "BUTTON",
    styleProperties: [
      { id: "height", label: "Height", defaultValue: "32px", type: "string" },
      { id: "width", label: "Width", defaultValue: "96px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
      { id: "color", label: "Color", defaultValue: "black", type: "string" },
      {
        id: "backgroundColor",
        label: "Background Color",
        defaultValue: "white",
        type: "string",
      },
      {
        id: "borderColor",
        label: "Border Color",
        defaultValue: "black",
        type: "string",
      },
    ],
    configs: [
      {
        id: "text",
        label: "Text",
        type: "string",
        defaultValue: "Button",
      },
    ],
    events: [
      {
        id: "onClick",
        label: "onClick",
        defaultValue: [],
      },
    ],
  },
  INPUT: {
    title: "Input",
    type: "INPUT",
    icon: <RxInput />,
    styleProperties: [
      { id: "height", label: "Height", defaultValue: "32px", type: "string" },
      { id: "width", label: "Width", defaultValue: "200px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
    ],
    configs: [
      {
        id: "type",
        label: "Type",
        type: "string",
        defaultValue: "text",
      },
      {
        id: "label",
        label: "Label",
        type: "string",
        defaultValue: "Input",
      },
      {
        id: "placeholder",
        label: "Placeholder",
        type: "string",
        defaultValue: "placeholder",
      },
    ],
    events: [
      {
        id: "onChange",
        label: "onChange",
        defaultValue: [],
      },
    ],
  },
  SELECT: {
    title: "Select",
    type: "SELECT",
    icon: <IconSelect />,
    styleProperties: [
      { id: "height", label: "Height", defaultValue: "32px", type: "string" },
      { id: "width", label: "Width", defaultValue: "200px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
    ],
    configs: [
      {
        id: "label",
        label: "Label",
        type: "string",
        defaultValue: "",
      },
      {
        id: "placeholder",
        label: "Placeholder",
        type: "string",
        defaultValue: "Select",
      },
      {
        id: "options",
        label: "options",
        type: "options",
        defaultValue: [],
      },
    ],
    events: [
      {
        id: "onChange",
        label: "onChange",
        defaultValue: [],
      },
    ],
  },
  TABLE: {
    title: "Table",
    type: "TABLE",
    icon: <RxTable />,
    styleProperties: [
      { id: "height", label: "Height", defaultValue: "400px", type: "string" },
      { id: "width", label: "Width", defaultValue: "304px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
    ],
    configs: [
      {
        id: "data",
        label: "Data",
        type: "string",
        defaultValue: "",
      },
      {
        id: "columns",
        label: "columns",
        type: "columns",
        defaultValue: [],
      },
    ],
    events: [
      {
        id: "onLoad",
        label: "onLoad",
        defaultValue: [],
      },
    ],
  },
  SWITCH: {
    title: "Switch",
    type: WIDGET_TYPES.SWITCH,
    icon: <RxSwitch />,
    styleProperties: [
      { id: "height", label: "Height", defaultValue: "32px", type: "string" },
      { id: "width", label: "Width", defaultValue: "200px", type: "string" },
      { id: "left", label: "Left", defaultValue: "0px", type: "string" },
      { id: "top", label: "Top", defaultValue: "0px", type: "string" },
    ],
    configs: [
      {
        id: "label",
        label: "Label",
        type: "string",
        defaultValue: "",
      },
    ],
    events: [
      {
        id: "onChange",
        label: "onChange",
        defaultValue: [],
      },
    ],
  },
};

export const widgetList: BaseWidget[] = Object.values(BASE_WIDGET_MAP);
