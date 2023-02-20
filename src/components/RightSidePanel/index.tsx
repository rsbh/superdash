import { WidgetComponent } from "../../types/widget";

interface RightSidePanelProps {
  selectedWidget: WidgetComponent | null;
}

export default function RightSidePanel({
  selectedWidget,
}: RightSidePanelProps) {
  const { height, width } = selectedWidget?.styles || {
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
