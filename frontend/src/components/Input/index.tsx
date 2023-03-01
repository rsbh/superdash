import styled from "styled-components";
import { blackA, whiteA } from "@radix-ui/colors";
import * as Label from "@radix-ui/react-label";

type LabelPosition = "left" | "top";

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

const StyledLabel = styled(Label.Root)<{ labelPostion?: LabelPosition }>`
  font-size: 16;
  font-weight: 600;
  margin-right: ${({ labelPostion }) => (labelPostion === "left" ? "16px" : 0)};
  margin-bottom: ${({ labelPostion }) => (labelPostion === "left" ? 0 : "8px")};
`;

const InputWrapper = styled.div<{ labelPostion?: LabelPosition }>`
  display: flex;
  justify-content: center;
  align-items: ${({ labelPostion }) =>
    labelPostion === "left" ? "center" : "left"};
  width: fit-content;
  flex-direction: ${({ labelPostion }) =>
    labelPostion === "left" ? "row" : "column"};
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
    <InputWrapper labelPostion={labelPostion}>
      {label ? (
        <StyledLabel htmlFor={id} labelPostion={labelPostion}>
          {label}
        </StyledLabel>
      ) : null}
      <InputBox
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}
      />
    </InputWrapper>
  );
}
