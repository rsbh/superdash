import { BASE_WIDGET_MAP } from "../../constants/widget";
import { WidgetComponent } from "../../types/widget";

interface RightSidePanelProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
}

export default function RightSidePanel({
  selectedWidget,
  onWidgetUpdate,
}: RightSidePanelProps) {
  if (!selectedWidget) return null;

  const baseWidget = BASE_WIDGET_MAP[selectedWidget?.widgetType];

  const onChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newStyles = {
      ...selectedWidget.styles,
      [id]: value,
    };
    onWidgetUpdate(selectedWidget.id, { ...selectedWidget, styles: newStyles });
  };

  return (
    <div className="right-side-panel">
      {baseWidget.styleProperties.map((s) => {
        return (
          <div key={selectedWidget.id + "-" + s.id}>
            <label>{s.label}</label>
            <input
              value={selectedWidget.styles[s.id]}
              onChange={onChange(s.id)}
            ></input>
          </div>
        );
      })}
    </div>
  );
}
