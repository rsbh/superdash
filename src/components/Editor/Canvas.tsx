import { useDrop } from "react-dnd";
import { DefaultDragType } from "../../constants/widget";
import { WidgetItem } from "../../types/widget";
import { Widget } from "./Widget";

interface CanvasProps {
  componentList: Record<string, WidgetItem>;
  onDrop: (i: any) => void;
}

export const Canvas = (props: CanvasProps) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: DefaultDragType,
    drop: (item: WidgetItem, monitor) => {
      const cordinates = monitor.getSourceClientOffset();
      props.onDrop({ ...item, ...cordinates });
    },
  }));

  return (
    <div className="drawer" ref={drop}>
      {Object.values(props.componentList).map((c: WidgetItem, i: number) => (
        <Widget key={c.id || "" + i} {...c} />
      ))}
    </div>
  );
};
