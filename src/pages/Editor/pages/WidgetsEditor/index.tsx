import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { Canvas } from "./components/Canvas";
import WidgetList from "./components/WidgetList";
import RightSidePanel from "./components/RightSidePanel";
import { WidgetComponent, WidgetsMap } from "@/types/widget";
import { createNewWidgetFromDropItem } from "@/utils/widget";

interface WidgetsEditorProps {
  widgetsMap: WidgetsMap;
  updatePageWidgets: (widgetsMap: WidgetsMap) => void;
  increaseWidgetsCount: () => number;
}

export default function Editor({
  updatePageWidgets,
  widgetsMap,
  increaseWidgetsCount,
}: WidgetsEditorProps) {
  const [selectedWidget, setSelectedWidget] = useState<WidgetComponent | null>(
    null
  );

  function onDrop(item: WidgetComponent) {
    const widgetCompoenent = item.id
      ? updateWidget(item.id, item)
      : createNewWidget(item);
    updatePageWidgets({
      ...widgetsMap,
      [widgetCompoenent.id]: widgetCompoenent,
    });
    setSelectedWidget(widgetCompoenent);
  }

  function createNewWidget(item: WidgetComponent) {
    const newCount = increaseWidgetsCount();
    const newWidget = createNewWidgetFromDropItem(item, newCount);
    return newWidget;
  }

  function updateWidget(id: string, updatedData: WidgetComponent) {
    const widget = widgetsMap[id];
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
    updatePageWidgets({
      ...widgetsMap,
      [id]: widget,
    });
    setSelectedWidget(widget);
  }

  function onWidgetClick(id: string) {
    const clickedWidget = widgetsMap[id];
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
            componentList={widgetsMap}
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
