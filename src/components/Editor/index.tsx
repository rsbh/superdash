import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { CSSProperties, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomDragLayer } from "../CustomDragLayer";
import { DraggableBox } from "../Box/DragableBox";
import { Canvas } from "./Canvas";

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
        <>
          <Canvas componentList={componentList} onDrop={onDrop}></Canvas>
          <CustomDragLayer />
        </>
      </DndProvider>
    </div>
  );
}
