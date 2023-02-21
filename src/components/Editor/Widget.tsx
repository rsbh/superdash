import { Enable, Resizable, ResizeDirection } from "re-resizable";
import { useState } from "react";
import { WidgetComponent } from "../../types/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

interface WidgetProps {
  widget: WidgetComponent;
  onClick?: (id: string) => void;
  onWidgetUpdate?: (id: string, updatedData: WidgetComponent) => void;
}

function addSize(pxSize: string, delta: number): string {
  const [numSize] = pxSize.split("px");
  console.log(pxSize, numSize, delta);
  return `${Number(numSize) + delta}px`;
}

export const Widget = ({ widget, onClick, onWidgetUpdate }: WidgetProps) => {
  const { id, styles, widgetType, config } = widget;
  const [isDragEnabled, setIsDragEnabled] = useState<boolean>(true);

  function onResizeStart() {
    setIsDragEnabled(false);
  }

  function onResizeStop(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    elementRef: HTMLElement,
    delta: { height: number; width: number }
  ) {
    const newStyles = { ...styles };
    if (direction === "left") {
      newStyles.left = addSize(styles.left as string, -1 * delta.width);
      newStyles.width = addSize(styles.width as string, delta.width);
    } else if (direction === "right") {
      newStyles.width = addSize(styles.width as string, delta.width);
    } else if (direction === "top") {
      newStyles.top = addSize(styles.top as string, -1 * delta.height);
      newStyles.height = addSize(styles.height as string, delta.height);
    } else if (direction === "bottom") {
      newStyles.height = addSize(styles.height as string, delta.height);
    }

    if (onWidgetUpdate) {
      onWidgetUpdate(id, { ...widget, styles: newStyles });
    }
    setIsDragEnabled(true);
  }

  return (
    <DragWrapper
      id={id}
      styles={{
        position: "absolute",
        top: styles.top,
        left: styles.left,
      }}
      onClick={onClick}
      widgetType={widgetType}
      isDragEnabled={isDragEnabled}
    >
      <Resizable
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        defaultSize={{ width: styles.width || 0, height: styles.height || 0 }}
      >
        <WidgetFactory
          widgetType={widgetType}
          style={styles}
          config={config}
        ></WidgetFactory>
      </Resizable>
    </DragWrapper>
  );
};
