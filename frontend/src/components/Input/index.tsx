import styled from "styled-components";
import { blackA, whiteA } from "@radix-ui/colors";
import Label, { LabelPosition } from "../Label";

const InputBox = styled.input`
  box-shadow: none;
  color: ${blackA.blackA12};

  border: 2px solid ${blackA.blackA12};
  background: ${whiteA.whiteA1};
  padding: 8px 16px;
  line-height: 1;
  font-size: 14px;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;

interface InputProps {
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  labelPostion?: LabelPosition;
}

export default function Input({
  id,
  value,
  onChange,
  label,
  placeholder,
  type,
  labelPostion = "left",
}: InputProps) {
  return (
    <Label position={labelPostion} htmlFor={id} label={label}>
      <InputBox
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}
      />
    </Label>
  );
}
