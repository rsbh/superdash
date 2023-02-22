import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { Canvas } from "./components/Canvas";
import WidgetList from "./components/WidgetList";
import RightSidePanel from "./components/RightSidePanel";
import { WidgetComponent } from "../../../../types/widget";
import { createNewWidgetFromDropItem } from "../../../../utils/widget";

export default function Editor() {
  const [componentList, setComponentList] = useState<
    Record<string, WidgetComponent>
  >({});

  const [widgetCount, setWidgetCount] = useState(0);

  const [selectedWidget, setSelectedWidget] = useState<WidgetComponent | null>(
    null
  );

  function onDrop(item: WidgetComponent) {
    const widgetCompoenent = item.id
      ? updateWidget(item.id, item)
      : createNewWidget(item);
    setComponentList((prev: Record<string, WidgetComponent>) => ({
      ...prev,
      [widgetCompoenent.id]: widgetCompoenent,
    }));
    setSelectedWidget(widgetCompoenent);
  }

  function createNewWidget(item: WidgetComponent) {
    const newCount = widgetCount + 1;
    const newWidget = createNewWidgetFromDropItem(item, newCount);
    setWidgetCount(newCount);
    return newWidget;
  }

  function updateWidget(id: string, updatedData: WidgetComponent) {
    const widget = componentList[id];
    return {
      ...widget,
      ...updatedData,
      styles: {
        ...widget.styles,
        ...updatedData.styles,
      },
      config: {
        ...widget.config,
        ...updatedData.config,
      },
    };
  }

  function onWidgetUpdate(id: string, updatedData: WidgetComponent) {
    const widget = updateWidget(id, updatedData);
    setComponentList((prev: Record<string, WidgetComponent>) => ({
      ...prev,
      [id]: widget,
    }));
    setSelectedWidget(widget);
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
            onWidgetUpdate={onWidgetUpdate}
          ></Canvas>
          <CustomDragLayer />
        </>
      </DndProvider>
      <RightSidePanel
        selectedWidget={selectedWidget}
        onWidgetUpdate={onWidgetUpdate}
      />
    </div>
  );
}
