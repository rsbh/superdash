import * as RadixLabel from "@radix-ui/react-label";
import { ReactNode } from "react";
import styled from "styled-components";

export type LabelPosition = "left" | "top";

export const StyledLabel = styled(RadixLabel.Root)<{
  labelPostion?: LabelPosition;
}>`
  font-size: 16;
  font-weight: 600;
  margin-right: ${({ labelPostion }) => (labelPostion === "left" ? "16px" : 0)};
  margin-bottom: ${({ labelPostion }) => (labelPostion === "left" ? 0 : "8px")};
`;

export const LabelWrapper = styled.div<{ labelPostion?: LabelPosition }>`
  display: flex;
  justify-content: center;
  align-items: ${({ labelPostion }) =>
    labelPostion === "left" ? "center" : "left"};
  width: fit-content;
  flex-direction: ${({ labelPostion }) =>
    labelPostion === "left" ? "row" : "column"};
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
