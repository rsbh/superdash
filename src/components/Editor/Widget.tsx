import { WidgetComponent } from "../../types/widget";
import { WidgetFactory } from "../WidgetFactory";
import { DragWrapper } from "./DragWrapper";

interface WidgetProps {
  widget: WidgetComponent;
  onClick?: (id: string) => void;
}

export const Widget = ({ widget, onClick }: WidgetProps) => {
  const { id, styles, widgetType, config } = widget;
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
    >
      <WidgetFactory
        widgetType={widgetType}
        style={styles}
        config={config}
      ></WidgetFactory>
    </DragWrapper>
  );
};
