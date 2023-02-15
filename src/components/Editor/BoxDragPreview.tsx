import type { CSSProperties, FC } from "react";
import React, { memo } from "react";

const styles: CSSProperties = {
  display: "block",
  height: "100px",
  width: "200px",
  backgroundColor: "greenyellow",
  opacity: 0.2,
};

export interface BoxDragPreviewProps {
  item: any;
}

export const BoxDragPreview: FC<BoxDragPreviewProps> = memo(
  function BoxDragPreview({ item }) {
    return <div style={styles}></div>;
  }
);
