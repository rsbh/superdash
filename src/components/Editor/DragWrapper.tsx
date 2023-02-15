import { CSSProperties, useEffect } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DefaultDragType } from "../../constants/widget";
import { WidgetTypes } from "../../types/widget";

interface DragWrapperProps {
  children: React.ReactElement;
  widgetType: WidgetTypes;
  previewStyle?: CSSProperties;
  isNewWidget?: boolean;
  id?: string;
  styles?: CSSProperties;
}

export function DragWrapper({
  children,
  widgetType,
  previewStyle,
  isNewWidget = false,
  styles = {},
  ...props
}: DragWrapperProps) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DefaultDragType,
      item: {
        widgetType: widgetType,
        previewStyle: previewStyle,
        isNewWidget: isNewWidget,
        ...(props.id && { id: props.id }),
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
    <div ref={drag} role="DraggableBox" style={styles}>
      {children}
    </div>
  );
}
