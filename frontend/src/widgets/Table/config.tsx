import { TableColumnTypes, TableColumnTypesMap } from "@/types/table";
import { BaseWidget } from "@/types/widget";
import { RxTable } from "react-icons/rx";

const config: BaseWidget = {
  title: "Table",
  type: "TABLE",
  icon: <RxTable />,
  styleProperties: [
    { id: "height", label: "Height", defaultValue: "400px", type: "string" },
    { id: "width", label: "Width", defaultValue: "600px", type: "string" },
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
};

export default config;

export const tableColumnTypes: Array<{
  label: string;
  value: TableColumnTypes;
}> = [
  { label: "Text", value: TableColumnTypesMap.TEXT },
  { label: "Input", value: TableColumnTypesMap.INPUT },
  { label: "Button", value: TableColumnTypesMap.BUTTON },
  { label: "Switch", value: TableColumnTypesMap.SWITCH },
  { label: "Checkbox", value: TableColumnTypesMap.CHECKBOX },
  { label: "Select", value: TableColumnTypesMap.SELECT },
];
