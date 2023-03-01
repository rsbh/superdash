import Switch from "@/components/Switch";
import { CSSProperties } from "react";

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

  return (
    <div style={style}>
      <Switch label={config["label"]} id={id} onChange={onChange} />
    </div>
  );
}
