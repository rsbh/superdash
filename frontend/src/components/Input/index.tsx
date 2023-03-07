import styled from "styled-components";
import Label, { LabelPosition } from "../Label";
import { rgba } from "polished";

const InputBox = styled.input`
  box-shadow: none;
  color: ${({ theme }) => theme.colors.primary};

  border: 2px solid ${({ theme }) => rgba(theme.colors.primary, 0.7)};
  background: ${({ theme }) => theme.colors.white};
  padding: 8px;
  line-height: 1;
  font-size: 16px;
  border-radius: 4px;
  height: 32px;

  &:focus {
    outline: 2px solid ${({ theme }) => rgba(theme.colors.primary, 0.1)};
  }
`;

interface InputProps {
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  labelPostion?: LabelPosition;
  defaultValue?: string;
  className?: string;
}

export default function Input({
  id,
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  type,
  labelPostion = "left",
  defaultValue,
  className,
}: InputProps) {
  return (
    <Label
      position={labelPostion}
      htmlFor={id}
      label={label}
      className={className}
    >
      <InputBox
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
      />
    </Label>
  );
}
