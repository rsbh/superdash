import { Resizable, ResizeDirection } from "re-resizable";
import { CSSProperties, useEffect, useState } from "react";
import { WidgetComponent } from "@/types/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

interface WidgetProps {
  widget: WidgetComponent;
  onClick?: (id: string) => void;
  onWidgetUpdate?: (id: string, updatedData: WidgetComponent) => void;
  updateWidgetsValue: (id: string, value: any) => void;
}

function addSize(pxSize: string, delta: number): string {
  const [numSize] = pxSize.split("px");
  return `${Number(numSize) + delta}px`;
}

export const Widget = ({
  widget,
  onClick,
  onWidgetUpdate,
  updateWidgetsValue,
}: WidgetProps) => {
  const { id, styles, widgetType, config } = widget;
  const [isDragEnabled, setIsDragEnabled] = useState<boolean>(true);
  const [widgetStyles, setWidgetStyles] = useState<CSSProperties>(styles);

  useEffect(() => {
    setWidgetStyles(styles);
  }, [styles]);

  function onResizeStart() {
    setIsDragEnabled(false);
  }

  function onResize(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    elementRef: HTMLElement,
    delta: { height: number; width: number }
  ) {
    if (direction === "left") {
      setWidgetStyles((prevStyles) => ({
        ...prevStyles,
        left: addSize(styles.left as string, -1 * delta.width),
        width: addSize(styles.width as string, delta.width),
      }));
    } else if (direction === "right") {
      setWidgetStyles((prevStyles) => ({
        ...prevStyles,
        width: addSize(styles.width as string, delta.width),
      }));
    } else if (direction === "top") {
      setWidgetStyles((prevStyles) => ({
        ...prevStyles,
        top: addSize(styles.top as string, -1 * delta.height),
        height: addSize(styles.height as string, delta.height),
      }));
    } else if (direction === "bottom") {
      setWidgetStyles((prevStyles) => ({
        ...prevStyles,
        height: addSize(styles.height as string, delta.height),
      }));
    }
  }

  function onResizeStop() {
    if (onWidgetUpdate) {
      onWidgetUpdate(id, { ...widget, styles: widgetStyles });
    }
    setIsDragEnabled(true);
  }

  return (
    <DragWrapper
      id={id}
      styles={{
        position: "absolute",
        top: widgetStyles.top,
        left: widgetStyles.left,
        height: widgetStyles.height,
        width: widgetStyles.width,
      }}
      onClick={onClick}
      widgetType={widgetType}
      isDragEnabled={isDragEnabled}
    >
      <Resizable
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        onResize={onResize}
        defaultSize={{ width: styles.width || 0, height: styles.height || 0 }}
      >
        <WidgetFactory
          id={id}
          widgetType={widgetType}
          style={widgetStyles}
          config={config}
          updateWidgetsValue={updateWidgetsValue}
        ></WidgetFactory>
      </Resizable>
    </DragWrapper>
  );
};
