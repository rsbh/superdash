import Select from "@/components/Select";
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

  const onEventsChange = (id: string) => (value: string) => {
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
      {baseWidget.events.map((e) => {
        return (
          <div
            key={selectedWidget.id + "-" + e.id}
            className="widget-property-item"
          >
            <Select
              label={e.label}
              options={actions.map((act) => ({
                label: act.name,
                value: act.id,
              }))}
              onChange={onEventsChange(e.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
