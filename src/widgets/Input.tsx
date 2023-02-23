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
  id: string;
  style: CSSProperties;
  config: InputConfig;
  updateWidgetsValue: (id: string, value: any) => void;
}

export default function Input({
  style,
  config,
  id,
  updateWidgetsValue,
}: InputProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updateWidgetsValue(id, value);
  }
  return (
    <>
      <label>{config.label}</label>
      <InputWrapper
        style={style}
        placeholder={config.placeholder}
        type={config.type}
        onChange={onChange}
      />
    </>
  );
}
