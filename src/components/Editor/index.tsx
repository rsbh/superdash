import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { CSSProperties, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomDragLayer } from "../CustomDragLayer";
import { DraggableBox } from "../Box/DragableBox";
import { ItemTypes } from "../../utils/ItemTypes";

const Widget = ({ x, y, id, children }: any) => {
  return (
    <div style={{ position: "absolute", top: y, left: x }}>
      <Dragable id={id}>{children}</Dragable>
    </div>
  );
};

const Dragable = (props: any) => {
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

const styles: CSSProperties = {
  width: 500,
  height: 500,
  border: "1px solid black",
  position: "relative",
};

const Canvas = (props: any) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item: any, monitor) => {
      const cordinates = monitor.getSourceClientOffset();
      props.onDrop({ ...item, ...cordinates });
    },
  }));

  return (
    <div className="drawer" ref={drop} style={styles}>
      {Object.values(props.componentList).map((c: any, i: number) => (
        <Widget key={c.id + i} {...c}>
          {c.id}
        </Widget>
      ))}
    </div>
  );
};

export default function Editor() {
  const [componentList, setComponentList] = useState<any>({});

  function onDrop(item: any) {
    const id = item.id || uuidv4();
    console.log("called ");
    setComponentList((prev: any) => ({
      ...prev,
      [id]: { id, ...item },
    }));
  }

  return (
    <div className="editor">
      <DndProvider backend={HTML5Backend}>
        <div className="component-list">
          <DraggableBox>
            <div>Button</div>
          </DraggableBox>
        </div>
        <div>
          <Canvas componentList={componentList} onDrop={onDrop}></Canvas>
          <CustomDragLayer />
        </div>
      </DndProvider>
    </div>
  );
}
