import { useDrag } from "react-dnd";
import { WidgetType } from "../../constants/widget";

export const Dragable = (props: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: WidgetType,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      ...(props.id && { id: props.id }),
    },
  }));
  return (
    <div
      ref={drag}
      style={{
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
        border: "1px solid black",
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export const Widget = ({ x, y, id, children, previewStyle }: any) => {
  return (
    <div style={{ position: "absolute", top: y, left: x, ...previewStyle }}>
      <Dragable id={id}>Mounted</Dragable>
    </div>
  );
};
