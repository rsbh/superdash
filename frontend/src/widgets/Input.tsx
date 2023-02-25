import { CSSProperties } from "react";
import styled from "styled-components";

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
  config: Record<string, any>;
  updateWidgetsValue: (id: string, value: any) => void;
  handleWidgetEvent?: (widgetId: string, eventName: string) => void;
}

export default function Input({
  style,
  config,
  id,
  updateWidgetsValue,
  handleWidgetEvent,
}: InputProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updateWidgetsValue(id, value);
    if (handleWidgetEvent) {
      handleWidgetEvent(id, "onChange");
    }
  }
  return (
    <div style={style}>
      <label>{config.label}</label>
      <InputWrapper
        placeholder={config.placeholder}
        type={config.type}
        onChange={onChange}
      />
    </div>
  );
}