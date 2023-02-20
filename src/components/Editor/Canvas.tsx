import { useDrop } from "react-dnd";
import { DefaultDragType } from "../../constants/widget";
import { DropItem, WidgetComponent } from "../../types/widget";
import { Widget } from "./Widget";

interface CanvasProps {
  componentList: Record<string, WidgetComponent>;
  onDrop: (i: WidgetComponent) => void;
  onWidgetClick?: (id: string) => void;
}

export const Canvas = ({
  onWidgetClick,
  onDrop,
  componentList,
}: CanvasProps) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: DefaultDragType,
    drop: (item: DropItem, monitor) => {
      const currentOffset = monitor.getSourceClientOffset();
      const styles = {
        ...item.styles,
        top: currentOffset?.y,
        left: currentOffset?.x,
      };
      onDrop({ ...item, styles });
    },
  }));

  return (
    <div className="drawer" ref={drop}>
      {Object.values(componentList).map((c: WidgetComponent, i: number) => (
        <Widget key={c.id || "" + i} widget={c} onClick={onWidgetClick} />
      ))}
    </div>
  );
};
