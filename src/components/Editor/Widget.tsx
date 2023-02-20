import { WidgetComponent } from "../../types/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

interface WidgetProps {
  widget: WidgetComponent;
  onClick?: (id: string) => void;
}

export const Widget = ({ widget, onClick }: WidgetProps) => {
  const { id, baseWidget, styles, widgetType } = widget;
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
      widgetType={widgetType}
    >
      <WidgetFactory
        widgetType={baseWidget.type}
        style={styles}
      ></WidgetFactory>
    </DragWrapper>
  );
};
