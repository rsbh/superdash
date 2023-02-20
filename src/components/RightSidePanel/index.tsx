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

  const onStyleChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onConfigChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newConfig = {
        ...selectedWidget.config,
        [id]: value,
      };
      onWidgetUpdate(selectedWidget.id, {
        ...selectedWidget,
        config: newConfig,
      });
    };

  return (
    <div className="right-side-panel">
      <div>
        <h2>Styles</h2>
        {baseWidget.styleProperties.map((s) => {
          return (
            <div
              key={selectedWidget.id + "-" + s.id}
              className="widget-property-item"
            >
              <label>{s.label}</label>
              <input
                value={selectedWidget.styles[s.id]}
                onChange={onStyleChange(s.id)}
              ></input>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Properties</h2>
        {baseWidget.configs.map((c) => {
          return (
            <div
              key={selectedWidget.id + "-" + c.id}
              className="widget-property-item"
            >
              <label>{c.label}</label>
              <input
                value={selectedWidget.config[c.id]}
                onChange={onConfigChange(c.id)}
              ></input>
            </div>
          );
        })}
      </div>
    </div>
  );
}
