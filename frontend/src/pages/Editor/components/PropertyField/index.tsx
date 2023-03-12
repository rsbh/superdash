import Label from "@/components/Label";

import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";

import { rgba } from "polished";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { json } from "@codemirror/lang-json";

interface PropertyFieldProps {
  id: string;
  label: string;
  value: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
}

const StyledCodeMirror = styled(CodeMirror)`
  box-shadow: none;
  color: ${({ theme }) => theme.colors.black};
  border: 2px solid ${({ theme }) => rgba(theme.colors.primary, 0.7)};
  background: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`;

export default function PropertyField({
  id,
  label,
  value,
  onChange,
  onBlur,
}: PropertyFieldProps) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  function handleChange(v: string) {
    setText(v);
    if (onChange) onChange(v);
  }

  function handleBlur() {
    if (onBlur) onBlur(text);
  }
  return (
    <>
      <Label label={label} position={"top"} htmlFor={id}>
        <StyledCodeMirror
          id={id}
          value={text}
          maxHeight="100px"
          extensions={[EditorView.lineWrapping, json()]}
          basicSetup={{
            lineNumbers: false,
            highlightActiveLine: false,
            foldGutter: false,
          }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Label>
    </>
  );
}
