import type { CSSProperties, FC } from "react";
import React, { memo, useEffect, useState } from "react";

import { Box } from "./";

const styles: CSSProperties = {
  display: "inline-block",
  transform: "rotate(-7deg)",
  WebkitTransform: "rotate(-7deg)",
};

export interface BoxDragPreviewProps {
  children: React.ReactElement;
}

export const BoxDragPreview: FC<BoxDragPreviewProps> = memo(
  function BoxDragPreview({ children }) {
    return (
      <div style={styles}>
        <Box preview>{children}</Box>
      </div>
    );
  }
);
