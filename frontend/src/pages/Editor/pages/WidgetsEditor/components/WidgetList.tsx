import { widgetList } from "@/constants/widget";
import { rgba } from "polished";
import styled from "styled-components";
import { DragWrapper } from "./Editor/DragWrapper";

const WidgetsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const WidgetsListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: 0.5px solid ${({ theme }) => rgba(theme.colors.primary, 0.5)};
  border-radius: 10%;
  margin: 8px;
  min-width: 60px;
`;

const WidgetsListItemIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
`;
const WidgetsListItemTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 10px;
`;

const WidgetsListDrawer = styled.div`
  max-width: 174px;
  border-right: 0.5px solid grey;
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
