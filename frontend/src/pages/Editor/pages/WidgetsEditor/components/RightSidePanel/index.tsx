import { BASE_WIDGET_MAP } from "@/constants/widget";
import {
  ActionsMap,
  WidgetComponent,
  WidgetConfigKeys,
  WidgetEventKeys,
} from "@/types/widget";
import { CSSProperties, useMemo } from "react";

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

  const onConfigChange =
    (id: WidgetConfigKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onEventsChange =
    (id: WidgetEventKeys) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      console.log(value);
      const newEvents = {
        [id]: [value],
      };
      onWidgetUpdate(selectedWidget.id, {
        ...selectedWidget,
        events: newEvents,
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
                //@ts-ignore
                value={selectedWidget.config[c.id]}
                onChange={onConfigChange(c.id)}
              ></input>
            </div>
          );
        })}
      </div>
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
                /* @ts-ignore */
                value={selectedWidget.events[e.id][0]}
                onChange={onEventsChange(e.id)}
                multiple
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
