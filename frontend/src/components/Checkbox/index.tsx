import { blackA } from "@radix-ui/colors";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import styled from "styled-components";
import Label, { LabelPosition } from "../Label";
const CheckboxRoot = styled(RadixCheckbox.Root)`
  all: unset;
  background-color: #fff;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px ${blackA.blackA7};
  border: 1px solid #000;

  &:hover {
    background-color: ${blackA.blackA7};
  }

  &:focus {
    box-shadow: 0 0 2px #000;
  }
`;

const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  color: #000;
  background-color: #000;
  height: 80%;
  width: 80%;
  border-radius: 4px;
`;

interface CheckBoxProps {
  id?: string;
  label?: string;
  labelPosition?: LabelPosition;
  onChange?: (value: boolean) => void;
  defaultValue?: boolean;
}

export default function Checkbox({
  id,
  label,
  labelPosition,
  onChange,
  defaultValue,
}: CheckBoxProps) {
  return (
    <Label htmlFor={id} label={label} position={labelPosition}>
      <CheckboxRoot onCheckedChange={onChange} defaultChecked={defaultValue}>
        <CheckboxIndicator></CheckboxIndicator>
      </CheckboxRoot>
    </Label>
  );
}
