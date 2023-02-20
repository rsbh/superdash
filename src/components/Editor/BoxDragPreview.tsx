import type { CSSProperties, FC } from "react";
import React, { memo } from "react";
import { DropItem } from "../../types/widget";

const styles: CSSProperties = {
  display: "block",
  backgroundColor: "greenyellow",
  opacity: 0.2,
};

export interface BoxDragPreviewProps {
  item: DropItem;
}

export const BoxDragPreview: FC<BoxDragPreviewProps> = memo(
  function BoxDragPreview({ item }) {
    return <div style={{ ...styles, ...item.size }}></div>;
  }
);
