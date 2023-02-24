import { widgetList } from "@/constants/widget";
import styled from "styled-components";
import { DragWrapper } from "./Editor/DragWrapper";

const WidgetsList = styled.div`
  display: flex;
`;

const WidgetsListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 0.5px solid grey;
  border-radius: 10%;
  margin: 8px;
  min-width: 60px;
`;

const WidgetsListItemIcon = styled.div`
  color: grey;
  font-size: 24px;
`;
const WidgetsListItemTitle = styled.div`
  color: grey;
  font-size: 12px;
`;

const WidgetsListDrawer = styled.div`
  width: 240px;
  border-right: 1px solid grey;
  padding: 8px;
`;

export default function WidgetList() {
  return (
    <WidgetsListDrawer>
      <WidgetsList>
        {widgetList.map((w) => (
          <DragWrapper key={w.type} widgetType={w.type} isDragEnabled={true}>
            <WidgetsListItem>
              <WidgetsListItemIcon>{w.icon}</WidgetsListItemIcon>
              <WidgetsListItemTitle>{w.title}</WidgetsListItemTitle>{" "}
            </WidgetsListItem>
          </DragWrapper>
        ))}
      </WidgetsList>
    </WidgetsListDrawer>
  );
}
