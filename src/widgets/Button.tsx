import { CSSProperties } from "react";
import styled from "styled-components";
import {
  ButtonWidgetConfig,
  ButtonWidgetEventsTypeMap,
  WidgetEventKeys,
} from "../types/widget";

export const ButtonWrapper = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
  cursor: pointer;
`;

interface ButtonProps {
  id: string;
  style: CSSProperties;
  config?: ButtonWidgetConfig;
  handleWidgetEvent?: (widgetId: string, eventName: WidgetEventKeys) => void;
}

export default function Button({
  style,
  config,
  id,
  handleWidgetEvent,
}: ButtonProps) {
  function onClick() {
    if (handleWidgetEvent) {
      handleWidgetEvent(id, ButtonWidgetEventsTypeMap.onClick);
    }
  }
  return (
    <ButtonWrapper style={style} onClick={onClick}>
      {config?.text}
    </ButtonWrapper>
  );
}
