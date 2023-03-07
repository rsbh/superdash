import { useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Collapsible from "@/components/Collapsible";
import {
  TableColumn,
  TableColumnTypesMap,
  TableColumnTypes,
} from "@/types/table";
import { tableColumnTypes } from "@/widgets/Table/config";

interface ColumnPropertyEditorProps {
  columns: TableColumn[];
  onChange: (e: any) => void;
}

const StyledInput = styled(Input)`
  justify-content: space-between !important;
  margin: 4px auto;
  input {
    width: 200px;
  }
`;
const StyledSelect = styled(Select)`
  justify-content: space-between !important;
  margin: 4px auto;

  button {
    width: 180px;
  }
`;

export default function ColumnPropertyEditor({
  columns,
  onChange,
}: ColumnPropertyEditorProps) {
  const [text, setText] = useState("");

  function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function onClick() {
    const newCol: TableColumn = { label: text, type: TableColumnTypesMap.TEXT };
    const updatedColumns = [...columns, newCol];
    onChange({
      target: {
        value: updatedColumns,
      },
    });
  }

  function onColumnTypeUpdate(colLabel: string) {
    return function (newType: string) {
      const updatedColumns = columns.map((c) => {
        return c.label === colLabel
          ? {
              ...c,
              type: newType as TableColumnTypes,
            }
          : c;
      });
      onChange({
        target: {
          value: updatedColumns,
        },
      });
    };
  }
  return (
    <div className="widget-property-item">
      <h3>Columns</h3>
      <div>
        {columns.map((c) => {
          return (
            <Collapsible key={c.label} label={c.label}>
              <div
                style={{
                  padding: "4px 8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <StyledInput value={c.label} label={"Label"} />
                <StyledSelect
                  onChange={onColumnTypeUpdate(c.label)}
                  placeholder="Column Type"
                  label="Type"
                  options={tableColumnTypes}
                />
                <StyledInput
                  label={"Data"}
                  defaultValue={c.key ? `{{rowData.${c.key}}}` : ""}
                />
              </div>
            </Collapsible>
          );
        })}
        <Input value={text} onChange={onTextChange} />
        <Button disabled={text.trim().length === 0} onClick={onClick}>
          Add Column
        </Button>
      </div>
    </div>
  );
}
