import { ReactElement } from "react";
import styled from "styled-components";
import { violet, blackA } from "@radix-ui/colors";

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  background-color: white;
  border-color: rgb(87, 70, 175);
  color: ${violet.violet11};
  border-color: ${violet.violet11};
  box-shadow: 0 2px 10px ${blackA.blackA7};
`;

interface ButtonProps {
  className?: string;
  children: ReactElement | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <ButtonWrapper onClick={onClick} className={className}>
      {children}
    </ButtonWrapper>
  );
}
