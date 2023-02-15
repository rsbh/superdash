import { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { WidgetItem, WidgetType } from "../../constants/widget";
import { Widget } from "./Widget";

interface CanvasProps {
  componentList: Record<string, WidgetItem>;
  onDrop: (i: any) => void;
}

export const Canvas = (props: CanvasProps) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: WidgetType,
    drop: (item: WidgetItem, monitor) => {
      const cordinates = monitor.getSourceClientOffset();
      props.onDrop({ ...item, ...cordinates });
    },
  }));

  return (
    <div className="drawer" ref={drop}>
      {Object.values(props.componentList).map((c: WidgetItem, i: number) => (
        <Widget key={c.id || "" + i} {...c}>
          {c.id}
        </Widget>
      ))}
    </div>
  );
};
