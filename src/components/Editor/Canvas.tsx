import { useDrop } from "react-dnd";
import { DefaultDragType } from "../../constants/widget";
import { DropItem, WidgetComponent } from "../../types/widget";
import { Widget } from "./Widget";

interface CanvasProps {
  componentList: Record<string, WidgetComponent>;
  onDrop: (i: WidgetComponent) => void;
}

export const Canvas = (props: CanvasProps) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: DefaultDragType,
    drop: (item: DropItem, monitor) => {
      const currentOffset = monitor.getSourceClientOffset();
      props.onDrop({ ...item, currentOffset });
    },
  }));

  return (
    <div className="drawer" ref={drop}>
      {Object.values(props.componentList).map(
        (c: WidgetComponent, i: number) => (
          <Widget key={c.id || "" + i} {...c} />
        )
      )}
    </div>
  );
};
