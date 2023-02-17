import { WidgetComponent } from "../../types/widget";

interface RightSidePanelProps {
  selectedWidget: WidgetComponent | null;
}

export default function RightSidePanel({
  selectedWidget,
}: RightSidePanelProps) {
  console.log(selectedWidget);
  const { height, width } = selectedWidget?.baseWidget.previewStyle || {
    height: 0,
    width: 0,
  };
  return (
    <div className="right-side-panel">
      <label>Height</label>
      <input value={height}></input>
      <br />
      <br />
      <label>Width</label>
      <input value={width}></input>
      <br />
    </div>
  );
}
