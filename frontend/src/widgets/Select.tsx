import Input from "@/components/Input";
import Select from "@/components/Select";
import { CSSProperties, useMemo } from "react";

interface SelectWidgetProps {
  id: string;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  updateWidgetsValue: (id: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function SelectWidget({
  style,
  config,
  id,
  name,
  updateWidgetsValue,
  handleWidgetEvent,
}: SelectWidgetProps) {
  function onChange(value: string) {
    updateWidgetsValue(name, value);
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onChange");
    }
  }

  const options = useMemo(() => {
    return config["options"] || [];
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
