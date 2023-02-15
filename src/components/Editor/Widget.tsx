import { useDrag } from "react-dnd";
import { WidgetType } from "../../constants/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

export const Widget = ({ x, y, id, previewStyle, widgetType }: any) => {
  return (
    <DragWrapper
      id={id}
      widgetType={widgetType}
      previewStyle={previewStyle}
      styles={{ position: "absolute", top: y, left: x }}
    >
      <div
        style={{ border: "1px solid black", height: "100%", ...previewStyle }}
      >
        <WidgetFactory widgetType={widgetType}></WidgetFactory>
      </div>
    </DragWrapper>
  );
};
