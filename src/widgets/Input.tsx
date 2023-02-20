import { CSSProperties } from "react";
import styled from "styled-components";
import { InputConfig } from "../types/widget";

export const InputWrapper = styled.input`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

interface InputProps {
  style: CSSProperties;
  config: InputConfig;
}

export default function Input({ style, config }: InputProps) {
  return (
    <>
      <label>{config.label}</label>
      <InputWrapper
        style={style}
        placeholder={config.placeholder}
        type={config.type}
      />
    </>
  );
}
