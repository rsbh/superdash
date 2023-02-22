import { useDrop } from "react-dnd";
import { DefaultDragType } from "@/constants/widget";
import { DropItem, WidgetComponent } from "@/types/widget";
import { Widget } from "./Editor/Widget";

interface CanvasProps {
  componentList: Record<string, WidgetComponent>;
  onDrop: (i: WidgetComponent) => void;
  onWidgetClick?: (id: string) => void;
  onWidgetUpdate?: (id: string, updatedData: WidgetComponent) => void;
}

export const Canvas = ({
  onWidgetClick,
  onDrop,
  componentList,
  onWidgetUpdate,
}: CanvasProps) => {
  const [collectedProps, drop] = useDrop(
    () => ({
      accept: DefaultDragType,
      drop: (item: DropItem, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        const styles = {
          ...item.styles,
          top: currentOffset?.y + "px",
          left: currentOffset?.x + "px",
        };
        onDrop({ ...item, styles, config: {} });
      },
    }),
    [componentList]
  );

  return (
    <div className="drawer" ref={drop}>
      {Object.values(componentList).map((c: WidgetComponent, i: number) => (
        <Widget
          key={c.id || "" + i}
          widget={c}
          onClick={onWidgetClick}
          onWidgetUpdate={onWidgetUpdate}
        />
      ))}
    </div>
  );
};
