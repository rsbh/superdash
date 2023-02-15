import { widgetList } from "../../constants/widget";
import { DragWrapper } from "./DragWrapper";

export default function WidgetList() {
  return (
    <div className="component-list">
      {widgetList.map((w) => (
        <DragWrapper key={w.type} isNewWidget={true} baseWidget={w}>
          <div className="component-small">{w.title}</div>
        </DragWrapper>
      ))}
    </div>
  );
}
