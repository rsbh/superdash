import Input from "@/components/Input";
import { BASE_WIDGET_MAP } from "@/constants/widget";
import PropertyField from "@/pages/Editor/components/PropertyField";
import { TableColumn } from "@/types/table";
import { WidgetComponent } from "@/types/widget";
import { boolToString } from "@/utils";
import styled from "styled-components";
import ColumnPropertyEditor from "./ColumnPropertyEditor";

const WidgetPropertyItemWrapper = styled.div`
  label {
    font-size: 12px;
    width: 40px;
  }
  margin: 8px 0;
`;

interface PropertiesTabProps {
  selectedWidget: WidgetComponent | null;
  onWidgetUpdate: (id: string, widget: WidgetComponent) => void;
}

interface PropertiesItemProps {
  id: string;
  label: string;
  value: any | Array<any>;
  onChange: (e: string) => void;
  type: string;
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
          <PropertyField
            id={id}
            label={label}
            value={value as string}
            onBlur={onChange}
          />
        </WidgetPropertyItemWrapper>
      );
    }
    case "boolean": {
      return (
        <WidgetPropertyItemWrapper>
          <PropertyField
            id={id}
            label={label}
            value={boolToString(value)}
            onBlur={onChange}
          />
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
          <PropertyField
            id={id}
            label={label}
            value={value as string}
            onBlur={onChange}
          />
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

  const onConfigChange = (id: string) => (value: string) => {
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
