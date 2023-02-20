import { CSSProperties, useEffect, useMemo } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DefaultDragType } from "../../constants/widget";
import { BaseWidget, WidgetTypes } from "../../types/widget";
import { getBaseWidgetStyles } from "../../utils/style";

interface DragWrapperProps {
  children: React.ReactElement;
  widgetType: WidgetTypes;
  id?: string;
  styles?: CSSProperties;
  baseWidget: BaseWidget;
  onClick?: (id: string) => void;
}

export function DragWrapper({
  children,
  styles = {},
  baseWidget,
  onClick,
  widgetType,
  id,
}: DragWrapperProps) {
  const widgetSize = useMemo(() => {
    const widgetStyle = getBaseWidgetStyles(widgetType, styles);
    return { height: widgetStyle.height, width: widgetStyle.width };
  }, []);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DefaultDragType,
      item: {
        baseWidget,
        widgetType: baseWidget.type,
        size: widgetSize,
        ...(id && { id: id }),
      },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [baseWidget]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  function clickHandler() {
    if (onClick && id) {
      onClick(id);
    }
  }

  return (
    <div ref={drag} role="DraggableBox" style={styles} onClick={clickHandler}>
      {children}
    </div>
  );
}
