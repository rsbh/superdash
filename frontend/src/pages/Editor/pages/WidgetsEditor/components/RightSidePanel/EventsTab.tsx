import { BASE_WIDGET_MAP } from "@/constants/widget";
import { WidgetComponent, ActionsMap } from "@/types/widget";
import { useMemo } from "react";

interface EventsTabProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
  actionMap: ActionsMap;
}

export default function EventsTab({
  selectedWidget,
  onWidgetUpdate,
  actionMap,
}: EventsTabProps) {
  if (!selectedWidget) return null;

  const baseWidget = BASE_WIDGET_MAP[selectedWidget?.widgetType];

  const actions = useMemo(
    () => [{ id: "none", name: "No Action" }, ...Object.values(actionMap)],
    [actionMap]
  );

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

  return (
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
  );
}
