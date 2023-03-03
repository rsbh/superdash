import { CSSProperties, ReactElement } from "react";
import styled from "styled-components";
import { rgba } from "polished";

type ButtonType = "primary" | "secondary";

const ButtonWrapper = styled.button<{ buttonType: ButtonType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ buttonType, theme }) =>
    buttonType === "primary" ? theme.colors.primary : theme.colors.white};
  color: ${({ buttonType, theme }) =>
    buttonType === "primary" ? theme.colors.white : theme.colors.primary};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${({ buttonType, theme }) =>
      buttonType === "primary"
        ? rgba(theme.colors.primary, 0.9)
        : rgba(theme.colors.primary, 0.1)};
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
