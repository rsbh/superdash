import { CSSProperties } from "react";
import styled from "styled-components";
import { ButtonConfig } from "../types/widget";

export const ButtonWrapper = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

interface ButtonProps {
  style: CSSProperties;
  config?: ButtonConfig;
}

export default function Button({ style, config }: ButtonProps) {
  return <ButtonWrapper style={style}>{config?.text}</ButtonWrapper>;
}
