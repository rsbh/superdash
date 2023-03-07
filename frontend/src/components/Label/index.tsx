import * as RadixLabel from "@radix-ui/react-label";
import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

export type LabelPosition = "left" | "top" | "right";

export const StyledLabel = styled(RadixLabel.Root).withConfig({
  shouldForwardProp: (prop) => !["labelPosition"].includes(prop),
})<{ labelPosition?: LabelPosition }>`
  font-size: 16;
  font-weight: 600;
  margin-right: ${({ labelPosition }) =>
    labelPosition === "left" ? "16px" : 0};
  margin-bottom: ${({ labelPosition }) =>
    labelPosition === "top" ? "8px" : 0};
  margin-left: ${({ labelPosition }) =>
    labelPosition === "right" ? "16px" : 0};
`;

export const LabelWrapper = styled.div<{ labelPosition?: LabelPosition }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ labelPosition }) =>
    labelPosition === "top" ? "left" : "center"};
  flex-direction: ${({ labelPosition }) =>
    labelPosition === "left"
      ? "row"
      : labelPosition === "right"
      ? "row-reverse"
      : "column"};
`;

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  label?: string;
  position?: LabelPosition;
  className?: string;
}

export default function Label({
  htmlFor,
  label,
  position = "left",
  children,
  className = "",
}: LabelProps) {
  return (
    <LabelWrapper labelPosition={position} className={className}>
      {label ? (
        <StyledLabel htmlFor={htmlFor} labelPosition={position}>
          {label}
        </StyledLabel>
      ) : null}
      {children}
    </LabelWrapper>
  );
}
