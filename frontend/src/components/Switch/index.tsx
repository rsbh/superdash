import { blackA } from "@radix-ui/colors";
import * as RadixSwitch from "@radix-ui/react-switch";
import styled from "styled-components";
import Label, { LabelPosition, LabelWrapper, StyledLabel } from "../Label";

interface SwitchProps {
  id: string;
  labelPostion?: LabelPosition;
  label?: string;
  onChange: (checked: boolean) => void;
}

const SwitchRoot = styled(RadixSwitch.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: ${blackA.blackA9};
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px ${blackA.blackA7};

  &:focus {
    box-shadow: 0 0 2px #000;
  }
  &[data-state="checked"] {
    background-color: #000;
  }
`;

const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 0 2px ${blackA.blackA7};
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
}: SwitchProps) {
  return (
    <Label label={label} position={labelPostion} htmlFor={id}>
      <SwitchRoot id={id} onCheckedChange={onChange}>
        <SwitchThumb />
      </SwitchRoot>
    </Label>
  );
}
