import { CSSProperties, useEffect } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DefaultDragType } from "../../constants/widget";
import { BaseWidget } from "../../types/widget";

interface DragWrapperProps {
  children: React.ReactElement;
  isNewWidget?: boolean;
  id?: string;
  styles?: CSSProperties;
  baseWidget: BaseWidget;
  onClick?: (id: string) => void;
}

export function DragWrapper({
  children,
  isNewWidget = false,
  styles = {},
  baseWidget,
  onClick,
  id,
  ...props
}: DragWrapperProps) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DefaultDragType,
      item: {
        baseWidget,
        isNewWidget: isNewWidget,
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
