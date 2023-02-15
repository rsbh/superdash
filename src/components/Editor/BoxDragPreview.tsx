import type { CSSProperties, FC } from "react";
import React, { memo } from "react";
import { WidgetItem } from "../../types/widget";

const styles: CSSProperties = {
  display: "block",
  backgroundColor: "greenyellow",
  opacity: 0.2,
};

export interface BoxDragPreviewProps {
  item: WidgetItem;
}

export const BoxDragPreview: FC<BoxDragPreviewProps> = memo(
  function BoxDragPreview({ item }) {
    return <div style={{ ...styles, ...item.previewStyle }}></div>;
  }
);
