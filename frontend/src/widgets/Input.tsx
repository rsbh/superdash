import Input from "@/components/Input";
import { CSSProperties } from "react";

interface InputWidgetProps {
  id: string;
  style: CSSProperties;
  config: Record<string, any>;
  updateWidgetsValue: (id: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function InputWidget({
  style,
  config,
  id,
  updateWidgetsValue,
  handleWidgetEvent,
}: InputWidgetProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updateWidgetsValue(id, value);
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onChange");
    }
  }
  return (
    <div style={style}>
      <Input
        placeholder={config.placeholder}
        type={config.type}
        onChange={onChange}
        label={config.label}
        id={id}
      />
    </div>
  );
}
