import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { useState } from "react";

export const ItemTypes = {
  Button: "button",
};

const Dragable = (props: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.Button,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: {
      id: props.id,
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

  console.log(props.componentList);

  return (
    <div className="drawer" ref={drop}>
      {props.componentList.map((c: any, i: number) => (
        <div
          key={c.id + i}
          style={{ position: "absolute", top: c.y, left: c.x }}
        >
          {c.id}
        </div>
      ))}
    </div>
  );
};

export default function Editor() {
  const [componentList, setComponentList] = useState<any>([]);

  function onDrop(item: any) {
    setComponentList([...componentList, item]);
  }

  return (
    <div className="editor">
      <DndProvider backend={HTML5Backend}>
        <div className="component-list">
          <Dragable id={"btn-1"}>Button</Dragable>
        </div>
        <Canvas componentList={componentList} onDrop={onDrop}></Canvas>
      </DndProvider>
    </div>
  );
}
