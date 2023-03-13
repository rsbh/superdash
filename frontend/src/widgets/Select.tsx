import Select from "@/components/Select";
import {
  runCustomCode,
  trimCustomVariableRegex,
} from "@/utils/customVariables";
import { CSSProperties, useMemo } from "react";

interface SelectWidgetProps {
  id: string;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  updateWidgetsData: (name: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function SelectWidget({
  style,
  config,
  id,
  name,
  updateWidgetsData,
  handleWidgetEvent,
}: SelectWidgetProps) {
  function onChange(value: string) {
    updateWidgetsData(name, value);
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onChange");
    }
  }

  const options = useMemo(() => {
    const customCode = trimCustomVariableRegex(config["options"]);
    return runCustomCode(customCode, {
      actions: {},
      widgets: {},
    });
  }, [config["options"]]);

  return (
    <div style={style}>
      <Select
        placeholder={config.placeholder}
        onChange={onChange}
        label={config.label}
        id={id}
        options={options}
      />
    </div>
  );
}
