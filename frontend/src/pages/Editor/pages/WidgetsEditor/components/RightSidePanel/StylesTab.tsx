import Input from "@/components/Input";
import { BASE_WIDGET_MAP } from "@/constants/widget";
import { WidgetComponent } from "@/types/widget";
import { CSSProperties } from "react";

interface StylesTabProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
}

export default function StylesTab({
  selectedWidget,
  onWidgetUpdate,
}: StylesTabProps) {
  if (!selectedWidget) return null;

  const baseWidget = BASE_WIDGET_MAP[selectedWidget?.widgetType];

  const onStyleChange =
    (id: keyof CSSProperties) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newStyles = {
        ...selectedWidget.styles,
        [id]: value,
      };
      onWidgetUpdate(selectedWidget.id, {
        ...selectedWidget,
        styles: newStyles,
      });
    };

  return (
    <div>
      <h2>Styles</h2>
      {baseWidget.styleProperties.map((s) => {
        return (
          <div
            key={selectedWidget.id + "-" + s.id}
            className="widget-property-item"
          >
            <Input
              id={selectedWidget.id + "-" + s.id}
              label={s.label}
              value={selectedWidget.styles[s.id]}
              onChange={onStyleChange(s.id)}
            ></Input>
          </div>
        );
      })}
    </div>
  );
}
