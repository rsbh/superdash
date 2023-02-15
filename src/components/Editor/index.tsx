import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomDragLayer } from "./CustomDragLayer";
import { Canvas } from "./Canvas";
import WidgetList from "./WidgetList";
import { WidgetComponent } from "../../types/widget";

export default function Editor() {
  const [componentList, setComponentList] = useState<
    Record<string, WidgetComponent>
  >({});

  function onDrop(item: WidgetComponent) {
    const id = item.id || uuidv4();
    setComponentList((prev: Record<string, WidgetComponent>) => ({
      ...prev,
      [id]: { ...item, id },
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
