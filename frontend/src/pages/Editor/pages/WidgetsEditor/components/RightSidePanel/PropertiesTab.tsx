import Input from "@/components/Input";
import { BASE_WIDGET_MAP } from "@/constants/widget";
import {
  TableColumn,
  TableColumnTypes,
  TableColumnTypesMap,
} from "@/types/table";
import { WidgetComponent } from "@/types/widget";
import { useState } from "react";
import Collapsible from "@/components/Collapsible";
import Button from "@/components/Button";
import Select from "@/components/Select";
import styled from "styled-components";

const WidgetPropertyItemWrapper = styled.div`
  label {
    font-size: 12px;
    width: 40px;
  }
  margin: 8px 0;
`;

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

interface PropertiesTabProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
}

interface PropertiesItemProps {
  id: string;
  label: string;
  value: string | Array<any>;
  onChange: (e: any) => void;
  type: string;
}

interface ColumnPropertyEditor {
  columns: TableColumn[];
  onChange: (e: any) => void;
}

const tableColumnTypes: Array<{ label: string; value: TableColumnTypes }> = [
  { label: "Text", value: TableColumnTypesMap.TEXT },
  { label: "Input", value: TableColumnTypesMap.INPUT },
  { label: "Button", value: TableColumnTypesMap.BUTTON },
];

function ColumnPropertyEditor({ columns, onChange }: ColumnPropertyEditor) {
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

function PropertiesItem({
  id,
  label,
  value,
  onChange,
  type,
}: PropertiesItemProps) {
  switch (type) {
    case "string": {
      return (
        <WidgetPropertyItemWrapper>
          <Input
            id={id}
            label={label}
            value={value as string}
            onChange={onChange}
          ></Input>
        </WidgetPropertyItemWrapper>
      );
    }
    case "columns": {
      return (
        <ColumnPropertyEditor
          columns={value as TableColumn[]}
          onChange={onChange}
        />
      );
    }
    default: {
      return (
        <WidgetPropertyItemWrapper>
          <Input
            id={id}
            label={label}
            value={value as string}
            onChange={onChange}
          ></Input>
        </WidgetPropertyItemWrapper>
      );
    }
  }
}

export default function PropertiesTab({
  selectedWidget,
  onWidgetUpdate,
}: PropertiesTabProps) {
  if (!selectedWidget) return null;

  const baseWidget = BASE_WIDGET_MAP[selectedWidget?.widgetType];

  const onConfigChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newConfig = {
        ...selectedWidget.config,
        [id]: value,
      };
      onWidgetUpdate(selectedWidget.id, {
        ...selectedWidget,
        config: newConfig,
      });
    };

  return (
    <div>
      {baseWidget.configs.map((c) => {
        return (
          <PropertiesItem
            id={selectedWidget.id + "-" + c.id}
            key={selectedWidget.id + "-" + c.id}
            label={c.label}
            value={selectedWidget.config[c.id]}
            onChange={onConfigChange(c.id)}
            type={c.type}
          />
        );
      })}
    </div>
  );
}
