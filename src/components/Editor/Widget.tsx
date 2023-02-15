import { WidgetComponent } from "../../types/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

export const Widget = ({ id, baseWidget, currentOffset }: WidgetComponent) => {
  return (
    <DragWrapper
      id={id}
      baseWidget={baseWidget}
      styles={{
        position: "absolute",
        top: currentOffset?.y,
        left: currentOffset?.x,
      }}
    >
      <div
        style={{
          height: "100%",
          ...baseWidget.previewStyle,
        }}
      >
        <WidgetFactory widgetType={baseWidget.type}></WidgetFactory>
      </div>
    </DragWrapper>
  );
};
