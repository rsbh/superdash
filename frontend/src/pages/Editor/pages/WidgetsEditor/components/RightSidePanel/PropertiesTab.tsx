import Input from "@/components/Input";
import { BASE_WIDGET_MAP } from "@/constants/widget";
import { WidgetComponent } from "@/types/widget";
import { useState } from "react";

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
  columns: Array<any>;
  onChange: (e: any) => void;
}

function ColumnPropertyEditor({ columns, onChange }: ColumnPropertyEditor) {
  const [text, setText] = useState("");

  function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function onClick() {
    const newCol = { label: text };
    const updatedColumns = [...columns, newCol];
    onChange({
      target: {
        value: updatedColumns,
      },
    });
  }
  return (
    <div className="widget-property-item">
      <h3>Columns</h3>
      <div>
        {columns.map((c) => {
          return <div key={c.label}>{c.label}</div>;
        })}
        <input value={text} onChange={onTextChange} />
        <button disabled={text.trim().length === 0} onClick={onClick}>
          Add Column
        </button>
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
        <div className="widget-property-item">
          <Input
            id={id}
            label={label}
            value={value as string}
            onChange={onChange}
          ></Input>
        </div>
      );
    }
    case "columns": {
      return (
        <ColumnPropertyEditor
          columns={value as Array<any>}
          onChange={onChange}
        />
      );
    }
    default: {
      return (
        <div className="widget-property-item">
          <Input
            id={id}
            label={label}
            value={value as string}
            onChange={onChange}
          ></Input>
        </div>
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
      <h2>Properties</h2>
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
