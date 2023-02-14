import type { CSSProperties, FC } from "react";
import { memo } from "react";

const styles: CSSProperties = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  cursor: "move",
};

export interface BoxProps {
  preview?: boolean;
  children: React.ReactElement;
}

export const Box: FC<BoxProps> = memo(function Box({ preview, children }) {
  return (
    <div style={{ ...styles }} role={preview ? "BoxPreview" : "Box"}>
      {children}
    </div>
  );
});
