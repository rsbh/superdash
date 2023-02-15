import { CSSProperties, useEffect } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import {
  WidgetType,
  WidgetItemTypes,
  WidgetPreviewStyle,
} from "../../constants/widget";

interface DragWrapperProps {
  children: React.ReactElement;
  widgetType: WidgetItemTypes;
  previewStyle?: WidgetPreviewStyle;
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
      type: WidgetType,
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
