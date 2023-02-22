import { widgetList } from "../../../../../constants/widget";
import { DragWrapper } from "./Editor/DragWrapper";

export default function WidgetList() {
  return (
    <div className="component-list">
      {widgetList.map((w) => (
        <DragWrapper key={w.type} widgetType={w.type} isDragEnabled={true}>
          <div className="component-small">{w.title}</div>
        </DragWrapper>
      ))}
    </div>
  );
}
