import * as RadixLabel from "@radix-ui/react-label";
import { ReactNode } from "react";
import styled from "styled-components";

export type LabelPosition = "left" | "top" | "right";

export const StyledLabel = styled(RadixLabel.Root)<{
  labelPostion?: LabelPosition;
}>`
  font-size: 16;
  font-weight: 600;
  margin-right: ${({ labelPostion }) => (labelPostion === "left" ? "16px" : 0)};
  margin-bottom: ${({ labelPostion }) => (labelPostion === "top" ? "8px" : 0)};
  margin-left: ${({ labelPostion }) => (labelPostion === "right" ? "16px" : 0)};
`;

export const LabelWrapper = styled.div<{ labelPostion?: LabelPosition }>`
  display: flex;
  justify-content: center;
  align-items: ${({ labelPostion }) =>
    labelPostion === "top" ? "left" : "center"};
  width: fit-content;
  flex-direction: ${({ labelPostion }) =>
    labelPostion === "left"
      ? "row"
      : labelPostion === "right"
      ? "row-reverse"
      : "column"};
`;

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  label?: string;
  position?: LabelPosition;
}

export default function Label({
  htmlFor,
  label,
  position = "left",
  children,
}: LabelProps) {
  return (
    <LabelWrapper labelPostion={position}>
      {label ? (
        <StyledLabel htmlFor={htmlFor} labelPostion={position}>
          {label}
        </StyledLabel>
      ) : null}
      {children}
    </LabelWrapper>
  );
}