import { CSSProperties, useEffect, useMemo } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DefaultDragType } from "../../../../../../constants/widget";
import { WidgetTypes } from "../../../../../../types/widget";
import { getBaseWidgetStyles } from "../../../../../../utils/style";

interface DragWrapperProps {
  children: React.ReactElement;
  widgetType: WidgetTypes;
  id?: string;
  styles?: CSSProperties;
  isDragEnabled: boolean;
  onClick?: (id: string) => void;
}

export function DragWrapper({
  children,
  styles = {},
  onClick,
  widgetType,
  isDragEnabled,
  id,
}: DragWrapperProps) {
  const widgetSize = useMemo(() => {
    const widgetStyle = getBaseWidgetStyles(widgetType, styles);
    return { height: widgetStyle.height, width: widgetStyle.width };
  }, [styles.height, styles.width, widgetType]);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DefaultDragType,
      canDrag: () => {
        return isDragEnabled;
      },
      item: {
        widgetType: widgetType,
        size: widgetSize,
        ...(id && { id: id }),
      },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [widgetType, widgetSize, id, isDragEnabled]
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
