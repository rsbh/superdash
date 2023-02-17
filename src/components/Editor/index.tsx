import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomDragLayer } from "./CustomDragLayer";
import { Canvas } from "./Canvas";
import WidgetList from "./WidgetList";
import RightSidePanel from "../RightSidePanel";
import { WidgetComponent } from "../../types/widget";

export default function Editor() {
  const [componentList, setComponentList] = useState<
    Record<string, WidgetComponent>
  >({});

  const [selectedWidget, setSelectedWidget] = useState<WidgetComponent | null>(
    null
  );

  function onDrop(item: WidgetComponent) {
    const widgetCompoenent = {
      ...item,
      id: item.id || uuidv4(),
    };
    setComponentList((prev: Record<string, WidgetComponent>) => ({
      ...prev,
      [widgetCompoenent.id]: widgetCompoenent,
    }));
    setSelectedWidget(widgetCompoenent);
  }

  function onWidgetClick(id: string) {
    const clickedWidget = componentList[id];
    if (clickedWidget) {
      setSelectedWidget(clickedWidget);
    }
  }

  return (
    <div className="editor">
      <DndProvider backend={HTML5Backend}>
        <WidgetList />
        <>
          <Canvas
            componentList={componentList}
            onDrop={onDrop}
            onWidgetClick={onWidgetClick}
          ></Canvas>
          <CustomDragLayer />
        </>
      </DndProvider>
      <RightSidePanel selectedWidget={selectedWidget} />
    </div>
  );
}
