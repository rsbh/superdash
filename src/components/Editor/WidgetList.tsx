import { widgetList } from "../../constants/widget";
import { DragWrapper } from "./DragWrapper";

export default function WidgetList() {
  console.log(widgetList);
  return (
    <div className="component-list">
      {widgetList.map((w) => (
        <DragWrapper
          key={w.type}
          widgetType={w.type}
          previewStyle={w.previewStyle}
          isNewWidget={true}
        >
          <div className="component-small">{w.title}</div>
        </DragWrapper>
      ))}
    </div>
  );
}
