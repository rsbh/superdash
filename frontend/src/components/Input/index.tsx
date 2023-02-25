import styled from "styled-components";
import { blackA, whiteA } from "@radix-ui/colors";
import * as Label from "@radix-ui/react-label";

const InputBox = styled.input`
  box-shadow: none;
  color: ${blackA.blackA12};

  border: 2px solid ${blackA.blackA12};
  background: ${whiteA.whiteA1};
  padding: 8px 16px;
  line-height: 1;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled(Label.Root)`
  font-size: 16;
  font-weight: 600;
`;

interface InputProps {
  id?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function Input({ id, value, onChange, label }: InputProps) {
  return (
    <>
      {label ? <StyledLabel htmlFor={id}>{label}</StyledLabel> : null}
      <InputBox value={value} onChange={onChange} id={id} />
    </>
  );
}
