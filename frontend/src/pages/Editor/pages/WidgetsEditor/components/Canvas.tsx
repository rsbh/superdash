import { useDrop } from "react-dnd";
import { DefaultDragType } from "@/constants/widget";
import { WidgetComponent, WidgetsMap } from "@/types/widget";
import { Widget } from "./Editor/Widget";
import { ValuesMap } from "@/types/page";

interface CanvasProps {
  componentList: WidgetsMap;
  onDrop: (i: WidgetComponent) => void;
  onWidgetClick?: (id: string) => void;
  onWidgetUpdate?: (id: string, updatedData: WidgetComponent) => void;
  updateWidgetsValue: (id: string, value: any) => void;
  actionsValuesMap: ValuesMap;
}

export const Canvas = ({
  onWidgetClick,
  onDrop,
  componentList,
  onWidgetUpdate,
  updateWidgetsValue,
  actionsValuesMap,
}: CanvasProps) => {
  const [collectedProps, drop] = useDrop(
    () => ({
      accept: DefaultDragType,
      drop: (item: WidgetComponent, monitor) => {
        const currentOffset = monitor.getSourceClientOffset();
        const styles = {
          ...item.styles,
          top: currentOffset?.y + "px",
          left: currentOffset?.x + "px",
        };

        onDrop({
          ...item,
          styles,
        });
      },
    }),
    [componentList]
  );

  return (
    <div className="drawer" ref={drop}>
      {Object.values(componentList).map((c: WidgetComponent, i: number) => (
        <Widget
          key={c.id || "" + i}
          widget={c}
          onClick={onWidgetClick}
          onWidgetUpdate={onWidgetUpdate}
          updateWidgetsValue={updateWidgetsValue}
          actionsValuesMap={actionsValuesMap}
        />
      ))}
    </div>
  );
};
