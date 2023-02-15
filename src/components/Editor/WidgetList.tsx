import { useEffect } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { WidgetType, widgetList } from "../../constants/widget";

function DragWrapper({ children, widgetType, previewStyle }: any) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: WidgetType,
      item: {
        widgetType: widgetType,
        previewStyle: previewStyle,
      },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [widgetType]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <>
      <div ref={drag} role="DraggableBox" className="component-small">
        {children}
      </div>
    </>
  );
}

export default function WidgetList() {
  return (
    <div className="component-list">
      {widgetList.map((w) => (
        <DragWrapper
          key={w.type}
          widgetType={w.type}
          previewStyle={w.previewStyle}
        >
          {w.title}
        </DragWrapper>
      ))}
    </div>
  );
}
