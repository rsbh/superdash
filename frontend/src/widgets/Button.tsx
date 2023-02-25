import Button from "@/components/Button";
import { CSSProperties } from "react";

interface ButtonWidgetProps {
  id: string;
  style: CSSProperties;
  config?: Record<string, any>;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function ButtonWidget({
  style,
  config,
  id,
  handleWidgetEvent,
}: ButtonWidgetProps) {
  function onClick() {
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onClick");
    }
  }
  return (
    <Button style={style} onClick={onClick}>
      {config?.text}
    </Button>
  );
}
