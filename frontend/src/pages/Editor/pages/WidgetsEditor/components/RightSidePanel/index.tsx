import Input from "@/components/Input";
import { BASE_WIDGET_MAP } from "@/constants/widget";
import { ActionsMap, WidgetComponent } from "@/types/widget";
import { CSSProperties, useMemo } from "react";
import PropertiesTab from "./PropertiesTab";

interface RightSidePanelProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
  actionMap: ActionsMap;
}

export default function RightSidePanel({
  selectedWidget,
  onWidgetUpdate,
  actionMap,
}: RightSidePanelProps) {
  if (!selectedWidget) return null;

  const baseWidget = BASE_WIDGET_MAP[selectedWidget?.widgetType];

  const actions = useMemo(
    () => [{ id: "none", name: "No Action" }, ...Object.values(actionMap)],
    [actionMap]
  );
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

  const onEventsChange =
    (id: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const newEvents = {
        [id]: [value],
      };
      onWidgetUpdate(selectedWidget.id, {
        ...selectedWidget,
        events: newEvents,
      });
    };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    onWidgetUpdate(selectedWidget.id, {
      ...selectedWidget,
      name,
    });
  };

  return (
    <div className="right-side-panel">
      <div className="widget-property-item">
        <Input
          id="widget-name"
          label="Name"
          value={selectedWidget.name}
          onChange={onNameChange}
        />
      </div>
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
      <PropertiesTab
        onWidgetUpdate={onWidgetUpdate}
        selectedWidget={selectedWidget}
      />
      <div>
        <h2>Events</h2>
        {baseWidget.events.map((e) => {
          return (
            <div
              key={selectedWidget.id + "-" + e.id}
              className="widget-property-item"
            >
              <label>{e.label}</label>
              <select
                value={selectedWidget.events[e.id]?.[0]}
                onChange={onEventsChange(e.id)}
              >
                {actions.map((act) => (
                  <option key={act.id} value={act.id}>
                    {act.name}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
