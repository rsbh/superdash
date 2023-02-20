import { WidgetComponent } from "../../types/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

interface WidgetProps {
  widget: WidgetComponent;
  onClick?: (id: string) => void;
}

export const Widget = ({ widget, onClick }: WidgetProps) => {
  const { id, baseWidget, styles } = widget;
  const customStyle = { ...baseWidget.previewStyle };
  return (
    <DragWrapper
      id={id}
      baseWidget={baseWidget}
      styles={{
        position: "absolute",
        top: styles.top,
        left: styles.left,
      }}
      onClick={onClick}
    >
      <WidgetFactory
        widgetType={baseWidget.type}
        style={customStyle}
      ></WidgetFactory>
    </DragWrapper>
  );
};
