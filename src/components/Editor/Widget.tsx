import { useDrag } from "react-dnd";
import { WidgetType } from "../../constants/widget";
import { DragWrapper } from "./DragWrapper";

export const Widget = ({ x, y, id, children, previewStyle, type }: any) => {
  return (
    <div style={{ position: "absolute", top: y, left: x }}>
      <DragWrapper id={id} widgetType={type} previewStyle={previewStyle}>
        <div
          style={{ border: "1px solid black", height: "100%", ...previewStyle }}
        >
          Mounted
        </div>
      </DragWrapper>
    </div>
  );
};
