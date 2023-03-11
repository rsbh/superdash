import Label from "@/components/Label";
import {
  autocompletion,
  completeFromList,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete";
import CodeMirror from "@uiw/react-codemirror";
import { javascript, localCompletionSource } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { syntaxTree } from "@codemirror/language";

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

const completePropertyAfter = ["PropertyName", ".", "?."];
const dontCompleteIn = [
  "TemplateString",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "PropertyDefinition",
];

export default function PropertyField({ id }: PropertyFieldProps) {
  const [value, setValue] = useState("");
  function localVariablesAutoComplete(
    context: CompletionContext
  ): CompletionResult | null {
    let word = context.matchBefore(/\w*/);
    if (word === null || (word?.from == word?.to && !context.explicit))
      return null;
    return {
      from: word?.from,
      options: [{ label: "match", type: "keyword" }],
    };
  }

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
          extensions={[
            javascript(),
            json(),
            autocompletion({
              override: [localVariablesAutoComplete, localCompletionSource],
            }),
          ]}
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
