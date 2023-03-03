import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { rgba } from "polished";
import styled from "styled-components";
import Label, { LabelPosition } from "../Label";

const CheckboxRoot = styled(RadixCheckbox.Root)`
  all: unset;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => rgba(theme.colors.primary, 0.1)};

  &:hover {
    background-color: 1px solid
      ${({ theme }) => rgba(theme.colors.primary, 0.3)};
  }

  &:focus {
    box-shadow: 0 2px 10px ${({ theme }) => rgba(theme.colors.primary, 0.3)};
  }
`;

const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
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
