import Checkbox from "@/components/Checkbox";
import { CSSProperties } from "react";

interface CheckboxWidgetProps {
  id: string;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  updateWidgetsData: (name: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function CheckboxWidget({
  style,
  config,
  id,
  name,
  updateWidgetsData,
  handleWidgetEvent,
}: CheckboxWidgetProps) {
  function onChange(value: boolean) {
    updateWidgetsData(name, value);
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onChange");
    }
  }

  return (
    <div style={style}>
      <Checkbox label={config["label"]} id={id} onChange={onChange} />
    </div>
  );
}
