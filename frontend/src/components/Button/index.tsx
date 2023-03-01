import { CSSProperties, ReactElement } from "react";
import styled from "styled-components";
import { blackA, whiteA } from "@radix-ui/colors";

type ButtonType = "primary" | "secondary";

const ButtonWrapper = styled.button<{ buttonType: ButtonType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  border: 2px solid ${blackA.blackA12};
  background: ${({ buttonType }) =>
    buttonType === "primary" ? whiteA.whiteA1 : blackA.blackA12};
  color: ${({ buttonType }) => (buttonType === "primary" ? "#000" : "#FFF")};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ buttonType }) =>
      buttonType === "primary" ? blackA.blackA6 : blackA.blackA11};
  }
`;

interface ButtonProps {
  type?: ButtonType;
  className?: string;
  children: ReactElement | string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  disabled?: boolean;
}

export default function Button({
  type = "primary",
  children,
  onClick,
  className,
  style,
  disabled = false,
}: ButtonProps) {
  return (
    <ButtonWrapper
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      buttonType={type}
    >
      {children}
    </ButtonWrapper>
  );
}
