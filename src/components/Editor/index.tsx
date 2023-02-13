import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ItemTypes = {
  Button: "button",
};

const Widget = ({ x, y, id, children }: any) => {
  return (
    <div style={{ position: "absolute", top: y, left: x }}>
      <Dragable id={id}>{children}</Dragable>
    </div>
  );
};

const Dragable = (props: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.Button,
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
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      {props.children}
    </div>
  );
};

const Canvas = (props: any) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.Button,
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

export default function Editor() {
  const [componentList, setComponentList] = useState<any>({});

  function onDrop(item: any) {
    const id = item.id || uuidv4();
    setComponentList((prev: any) => ({
      ...prev,
      [id]: { id, ...item },
    }));
  }

  return (
    <div className="editor">
      <DndProvider backend={HTML5Backend}>
        <div className="component-list">
          <Dragable>Button</Dragable>
        </div>
        <Canvas componentList={componentList} onDrop={onDrop}></Canvas>
      </DndProvider>
    </div>
  );
}
