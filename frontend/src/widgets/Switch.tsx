import Switch from "@/components/Switch";
import { CSSProperties, useMemo } from "react";

interface SwitchWidgetProps {
  id: string;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  updateWidgetsData: (name: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function SwitchWidget({
  style,
  config,
  id,
  name,
  updateWidgetsData,
  handleWidgetEvent,
}: SwitchWidgetProps) {
  function onChange(value: boolean) {
    updateWidgetsData(name, value);
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onChange");
    }
  }

  const defaultValue = useMemo(() => {
    return config["defaultValue"] === "true" || config["defaultValue"] === true
      ? true
      : false;
  }, [config["defaultValue"]]);

  return (
    <div style={style}>
      <Switch
        label={config["label"]}
        id={id}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
