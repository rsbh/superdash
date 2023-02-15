import { useEffect } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "../../utils/ItemTypes";

const widgets = [
  {
    title: "Button",
    type: "button",
  },
  {
    title: "Input",
    type: "input",
  },
  {
    title: "Table",
    type: "table",
  },
];

function DragWrapper({ children, widgetType }: any) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: {
        widgetType: widgetType,
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
      {widgets.map((w) => (
        <DragWrapper key={w.type} widgetType={w.type}>
          {w.title}
        </DragWrapper>
      ))}
    </div>
  );
}
