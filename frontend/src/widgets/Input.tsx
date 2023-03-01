import Input from "@/components/Input";
import { CSSProperties } from "react";

interface InputWidgetProps {
  id: string;
  name: string;
  style: CSSProperties;
  config: Record<string, any>;
  updateWidgetsData: (name: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function InputWidget({
  style,
  config,
  id,
  name,
  updateWidgetsData,
  handleWidgetEvent,
}: InputWidgetProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updateWidgetsData(name, value);
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
