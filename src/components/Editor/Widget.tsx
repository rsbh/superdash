import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/ItemTypes";

export const Dragable = (props: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      ...(props.id && { id: props.id }),
    },
  }));
  return (
    <div
      className="component-small"
      ref={drag}
      style={{
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      {props.children}
    </div>
  );
};

export const Widget = ({ x, y, id, children }: any) => {
  return (
    <div style={{ position: "absolute", top: y, left: x }}>
      <Dragable id={id}>{children}</Dragable>
    </div>
  );
};
