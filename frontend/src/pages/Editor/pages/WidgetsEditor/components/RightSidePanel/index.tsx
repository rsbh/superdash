import Input from "@/components/Input";
import Tabs from "@/components/Tabs";
import { ActionsMap, WidgetComponent } from "@/types/widget";
import EventsTab from "./EventsTab";
import PropertiesTab from "./PropertiesTab";
import StylesTab from "./StylesTab";

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
      <Tabs
        defaultValue="properties"
        tabs={[
          {
            value: "styles",
            label: "Styles",
            content: (
              <StylesTab
                onWidgetUpdate={onWidgetUpdate}
                selectedWidget={selectedWidget}
              />
            ),
          },
          {
            value: "properties",
            label: "Properties",
            content: (
              <PropertiesTab
                onWidgetUpdate={onWidgetUpdate}
                selectedWidget={selectedWidget}
              />
            ),
          },
          {
            value: "events",
            label: "Events",
            content: (
              <EventsTab
                onWidgetUpdate={onWidgetUpdate}
                selectedWidget={selectedWidget}
                actionMap={actionMap}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
