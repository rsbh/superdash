import { CSSProperties, ReactElement } from "react";
import styled from "styled-components";
import { blackA, whiteA } from "@radix-ui/colors";

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  border: 2px solid ${blackA.blackA12};
  background: ${whiteA.whiteA1};
  cursor: pointer;

  &:hover {
    background: ${blackA.blackA6};
  }
`;

interface ButtonProps {
  className?: string;
  children: ReactElement | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: CSSProperties;
}

export default function Button({
  children,
  onClick,
  className,
  style,
}: ButtonProps) {
  return (
    <ButtonWrapper onClick={onClick} className={className} style={style}>
      {children}
    </ButtonWrapper>
  );
}
