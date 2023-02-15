import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { CSSProperties, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomDragLayer } from "../CustomDragLayer";
import { Canvas } from "./Canvas";
import WidgetList from "./WidgetList";
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
        <WidgetList />
        <>
          <Canvas componentList={componentList} onDrop={onDrop}></Canvas>
          <CustomDragLayer />
        </>
      </DndProvider>
    </div>
  );
}
