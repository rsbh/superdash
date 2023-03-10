import * as RadixSwitch from "@radix-ui/react-switch";
import { rgba } from "polished";
import styled from "styled-components";
import Label, { LabelPosition, LabelWrapper, StyledLabel } from "../Label";

interface SwitchProps {
  id: string;
  labelPostion?: LabelPosition;
  label?: string;
  onChange?: (checked: boolean) => void;
  defaultValue?: boolean;
}

const SwitchRoot = styled(RadixSwitch.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: ${({ theme }) => rgba(theme.colors.primary, 0.3)};
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px ${({ theme }) => rgba(theme.colors.primary, 0.3)};

  &:focus {
    box-shadow: 0 0 2px ${({ theme }) => rgba(theme.colors.primary, 0.3)};
  }
  &[data-state="checked"] {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 9999px;
  box-shadow: 0 0 2px ${({ theme }) => rgba(theme.colors.primary, 0.3)};
  transition: transform 100ms;
  transform: translateX(2px);

  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;

export default function Switch({
  id,
  label,
  labelPostion,
  onChange,
  defaultValue,
}: SwitchProps) {
  return (
    <Label label={label} position={labelPostion} htmlFor={id}>
      <SwitchRoot
        id={id}
        onCheckedChange={onChange}
        defaultChecked={defaultValue}
      >
        <SwitchThumb />
      </SwitchRoot>
    </Label>
  );
}
