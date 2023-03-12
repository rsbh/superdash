import Label from "@/components/Label";

import CodeMirror from "@uiw/react-codemirror";

import { rgba } from "polished";
import styled from "styled-components";
import { useState } from "react";

interface PropertyFieldProps {
  id: string;
}

const StyledCodeMirror = styled(CodeMirror)`
  box-shadow: none;
  color: ${({ theme }) => theme.colors.black};
  border: 2px solid ${({ theme }) => rgba(theme.colors.primary, 0.7)};
  background: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`;

export default function PropertyField({ id }: PropertyFieldProps) {
  const [value, setValue] = useState("");

  function handleChange(v: string) {
    setValue(v);
  }

  return (
    <>
      <Label label="Label" position={"top"} htmlFor={id}>
        <StyledCodeMirror
          id={id}
          value={value}
          maxHeight="100px"
          extensions={[]}
          basicSetup={{
            lineNumbers: false,
            highlightActiveLine: false,
            foldGutter: false,
          }}
          onChange={handleChange}
        />
      </Label>
    </>
  );
}
