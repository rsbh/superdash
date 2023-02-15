import { WidgetComponent } from "../../types/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

export const Widget = ({ id, baseWidget, currentOffset }: WidgetComponent) => {
  const customStyle = { ...baseWidget.previewStyle };
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
      <WidgetFactory
        widgetType={baseWidget.type}
        style={customStyle}
      ></WidgetFactory>
    </DragWrapper>
  );
};
