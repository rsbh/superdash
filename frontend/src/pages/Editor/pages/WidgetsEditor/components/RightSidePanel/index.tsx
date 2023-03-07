import Input from "@/components/Input";
import Tabs from "@/components/Tabs";
import { ActionsMap, WidgetComponent } from "@/types/widget";
import styled from "styled-components";
import EventsTab from "./EventsTab";
import PropertiesTab from "./PropertiesTab";
import StylesTab from "./StylesTab";

interface RightSidePanelProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
  actionMap: ActionsMap;
}

const RightSidePanelWrapper = styled.div`
  width: 300px;
  border-left: 0.5px solid grey;
`;

const StyledTab = styled(Tabs)`
  width: 100%;
`;

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
    <RightSidePanelWrapper className="right-side-panel">
      <div className="widget-property-item">
        <Input
          id="widget-name"
          label="Name"
          value={selectedWidget.name}
          onChange={onNameChange}
        />
      </div>
      <StyledTab
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
    </RightSidePanelWrapper>
  );
}
