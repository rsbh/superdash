import { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/ItemTypes";
import { Widget } from "./Widget";

export const Canvas = (props: any) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item: any, monitor) => {
      const cordinates = monitor.getSourceClientOffset();
      props.onDrop({ ...item, ...cordinates });
    },
  }));

  return (
    <div className="drawer" ref={drop}>
      {Object.values(props.componentList).map((c: any, i: number) => (
        <Widget key={c.id + i} {...c}>
          {c.id}
        </Widget>
      ))}
    </div>
  );
};
